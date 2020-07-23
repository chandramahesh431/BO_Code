import React, { useState, useEffect } from 'react'
import { DataTable } from '@scuf/datatable'
import '@scuf/datatable/honeywell-compact-dark/theme.css'
import { Checkbox, Input } from '@scuf/common'

function ProductTable(props) {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    let setTrue = props.selectedRows.length > 0
    for (let i = 0; i < props.selectedRows.length; i += 1) {
      let row = props.selectedRows[i]
      if (
        isNaN(row['value']) || isNaN(row['setMin']) || isNaN(row['setMax']) ||
        row['value'].length <= 0 
      ) {
        setTrue = false
        break
      }
      let value = parseFloat(row['value'])
      let setMin = parseFloat(row['setMin'])
      let setMax = parseFloat(row['setMax'])
      let min = row['min']
      let max = row['max']
      if (
        setMin < min || setMax > max || setMin >= setMax ||
        value < min || value > max || value < setMin || value > setMax
      ) {
        setTrue = false
        break
      }
    }
    props.setAllowSave(setTrue)
    // eslint-disable-next-line
  }, [props.selectedRows])

  useEffect(() => {
    let data = []
    async function getData() {
      await fetch('http://localhost:5003/api/getformulaset', {
        "headers": {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      .then(response => response.json())
      .then(json => {
        data = json
      })
      .catch(err => console.log(err))
      let new_data = []
      if (data !== null && data !== {} && data.length > 0) {
        for (let i = 0; i < data.length; i += 1) {
          if (data[i].recipeID !== props.productMR.id) {
            continue
          }
          props.setPostData(data[i].masterFormulaParameters)
          new_data = data[i].masterFormulaParameters.map((entry, index) => {
            return (
              {
                no: parseInt(index) + 1,
                item: entry.paramName,
                value: entry.defaultValue,
                unit: entry.engUnit,
                min: entry.minValue,
                max: entry.maxValue,
                scale: entry.scalabale,
                setMin: "",
                setMax: "",
                desc: entry.paramDescription,
                enumSetName: entry.enumSetName
              }
            )
          })
          break
        }
        setTableData(new_data)
        props.setSelectedAll(true)
        props.setSelectedRows(new_data)
      }
    }

    if (props.showCreateProduct) {
      getData()
    }
    
    // eslint-disable-next-line
  }, [props.productMR, props.showCreateProduct])

  function editData(newData, cellData) {
    let dat = tableData.slice(0)
    dat[cellData.rowIndex][cellData.field] = newData
    setTableData(dat)
  }

  function renderCheckbox(cellData) {
    const checked = cellData.value
    return (
      <Checkbox 
        checked={checked} 
        style={{
          height: "1.25vw",
          margin: 0,
          padding: 0
        }}
      />
    )
  }
  function renderInput(cellData) {
    return (
      <Input 
        style={{
          width: "5vw",
          height: "1.875vw",
          border: 
            (
              (cellData.value !== "" && isNaN(cellData.value)) ||
              parseFloat(cellData.value) < tableData[cellData.rowIndex]["min"] ||
              parseFloat(cellData.value) > tableData[cellData.rowIndex]["max"] ||
              parseFloat(cellData.value) < parseFloat(tableData[cellData.rowIndex]["setMin"]) ||
              parseFloat(cellData.value) > parseFloat(tableData[cellData.rowIndex]["setMax"]) ||
              (
                cellData.field === "setMin" && 
                parseFloat(cellData.value) >= parseFloat(tableData[cellData.rowIndex]["setMax"])
              ) ||
              (
                cellData.field === "setMax" && 
                parseFloat(cellData.value) <= parseFloat(tableData[cellData.rowIndex]["setMin"])
              )
            )? "1px solid red" : ""
        }}
        value={cellData.value}
        onChange={(value) => {
          let data = tableData.slice(0)
          data[cellData.rowIndex][cellData.field] = value
          setTableData(data)
          let newSelectedRows = props.selectedRows.map(row => data[row.no - 1])
          props.setSelectedRows(newSelectedRows)
        }}
      />
    )
  }
  return (
    <div 
      style={{
        margin: "0.82vh auto",
        width: "100%"
      }}
    >
      <DataTable
        data={tableData}
        loading={tableData.length <= 0}
        onEdit={(newData, cellData) => editData(newData, cellData)}
        scrollable={true}
        scrollHeight="62.5vh"
        columnResizeMode="expand"
        selection={props.selectedRows}
        selectionMode="multiple"
        onSelectionChange={(rows) => {
          props.setSelectedRows(rows)
        }}
        onSelectAll={(e) => props.setSelectedAll(e)}
      >
        <DataTable.Column field="no" header="NO." />
        <DataTable.Column field="item" header="ITEM" />
        <DataTable.Column 
          field="value" 
          header="VALUE" 
          renderer={renderInput} 
        />      
        <DataTable.Column field="unit" header="ENG UNIT" />
        <DataTable.Column field="min" header="MIN VALUE" />
        <DataTable.Column field="max" header="MAX VALUE" />
        <DataTable.Column field="scale" header="SCALE" renderer={renderCheckbox} />
        <DataTable.Column 
          field="setMin" 
          header="SET MIN" 
          renderer={renderInput}
        />
        <DataTable.Column 
          field="setMax" 
          header="SET MAX" 
          renderer={renderInput}
        />
      </DataTable>
    </div>
  )
}

export default ProductTable