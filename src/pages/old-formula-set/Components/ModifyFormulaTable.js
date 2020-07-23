// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { DataTable } from '@scuf/datatable'
import '@scuf/datatable/honeywell-compact-dark/theme.css'
import { Checkbox, Input } from '@scuf/common'

function ModifyFormulaTable(props) {

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

  function editData(newData, cellData) {
    let dat = props.tableData.slice(0)
    dat[cellData.rowIndex][cellData.field] = newData
    props.setTableData(dat)
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
              parseFloat(cellData.value) < props.tableData[cellData.rowIndex]["min"] ||
              parseFloat(cellData.value) > props.tableData[cellData.rowIndex]["max"] ||
              parseFloat(cellData.value) < parseFloat(props.tableData[cellData.rowIndex]["setMin"]) ||
              parseFloat(cellData.value) > parseFloat(props.tableData[cellData.rowIndex]["setMax"]) ||
              (
                cellData.field === "setMin" && 
                parseFloat(cellData.value) >= parseFloat(props.tableData[cellData.rowIndex]["setMax"])
              ) ||
              (
                cellData.field === "setMax" && 
                parseFloat(cellData.value) <= parseFloat(props.tableData[cellData.rowIndex]["setMin"])
              )
            )? "1px solid red" : ""
        }}
        value={cellData.value}
        onChange={(value) => {
          let data = props.tableData.slice(0)
          data[cellData.rowIndex][cellData.field] = value
          props.setTableData(data)
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
        data={props.tableData}
        loading={props.tableData.length <= 0}
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

export default ModifyFormulaTable