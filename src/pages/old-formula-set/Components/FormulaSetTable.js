import React, { useEffect } from 'react'
import { DataTable } from '@scuf/datatable'
import '@scuf/datatable/honeywell-compact-dark/theme.css'
import { Checkbox } from '@scuf/common'

function FormulaSetTable(props) {

  useEffect(() => {
    let data = []
    async function getData() {
      await fetch('http://localhost:5003/api/getformulasetofProductType/' + props.productMR.set, {
        method: 'GET',
        "headers": {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      .then(response => response.json())
      .then(json => data = json)
      .catch(err => console.log(err))

      const data2 = data.map((entry, index) => {
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

    if (props.showViewFormulaSet) {
      getData()
    }
    // eslint-disable-next-line
  }, [props.showViewFormulaSet])

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

export default FormulaSetTable