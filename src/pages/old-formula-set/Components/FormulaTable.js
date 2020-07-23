import React, { useEffect } from 'react'
import { DataTable } from '@scuf/datatable'
import '@scuf/datatable/honeywell-compact-dark/theme.css'
import { Checkbox } from '@scuf/common'

function FormulaTable(props) {

  useEffect(() => {
    let data = []
    let existing_data = []
    async function getExistingData() {
      await fetch('http://localhost:5003/api/getformulaset/', {
        method: 'GET',
        "headers": {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      .then(response => response.json())
      .then(json => existing_data = json)
      .catch(err => console.log(err))
    }
    async function getData() {
      await fetch('http://localhost:5003/api/formulaparameters/' + props.strategyID, {
        method: 'GET',
        "headers": {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      .then(response => response.json())
      .then(json => data = json)
      .catch(err => console.log(err))

      data[0].productTypName = props.productName
      data[0].recipeName = props.recipeName
      let new_data = existing_data
      new_data.push(data[0])
      props.setSaveData(new_data)
      props.setHasData(true)

      const data2 = data[0].masterFormulaParameters.map((entry, index) => {
        return (
          {
            no: parseInt(index) + 1,
            item: entry.paramName,
            desc: entry.paramDescription,
            unit: entry.engUnit,
            min: entry.minValue,
            max: entry.maxValue,
            default: entry.defaultValue,
            scale: <Checkbox checked={entry.scalabale} style={{paddingTop: "0.625vw"}} />
          }
        )
      })

      props.setTableData(data2)
    }

    if (props.strategyID !== null && props.imported) {
      getExistingData()
      getData()
      props.setImported(false)
    }
  }, [props])

  return (
    <div 
      style={{
        margin: "0.4% auto 0.4% auto",
        width: "100%"
      }}
    >
      <DataTable
        data={props.tableData}
        scrollable={true}
        scrollHeight="64.75vh"
        loading={props.tableData.length <= 0}
      >
        <DataTable.Column field="no" header="NO." />
        <DataTable.Column field="item" header="ITEM" />
        <DataTable.Column field="unit" header="ENG UNIT" />
        <DataTable.Column field="min" header="MIN VALUE" />
        <DataTable.Column field="max" header="MAX VALUE" />
        <DataTable.Column field="default" header="DEFAULT VALUE" />
        <DataTable.Column field="scale" header="SCALE" />
      </DataTable>
    </div>
  )
}

export default FormulaTable