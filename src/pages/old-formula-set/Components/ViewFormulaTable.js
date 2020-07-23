// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { DataTable } from '@scuf/datatable'
import '@scuf/datatable/honeywell-compact-dark/theme.css'
import { Checkbox, Input } from '@scuf/common'

function ViewFormulaTable(props) {
  function editData(newData, cellData) {
    let data = props.tableData.slice(0)
    data[cellData.rowIndex][cellData.field] = newData
    props.setTableData(data)
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
        disabled
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

export default ViewFormulaTable