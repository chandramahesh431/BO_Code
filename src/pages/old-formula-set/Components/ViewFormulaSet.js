// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import { Input, Button } from '@scuf/common'
import FormulaSetTable from './FormulaSetTable'

function ViewFormulaSet(props) {
  const [tableData, setTableData] = useState([])

  return (
    <div
      style={{
        height: "98%",
        width: "90%",
        margin: "0.4% auto",
        background: "#151515",
        boxSizing: "border-box",
        padding: "0 2%",
        display: props.showViewFormulaSet? "block" : "none"
      }}
    >
      <div
        style={{ 
          float: "left",
          marginRight: "1.56vw",
          width: "20vw"
        }}
      >
        <p 
          style={{
            padding: 0,
            margin: 0,
            color: "white",
            fontFamily: '"Honeywell Sans Web",Arial,Helvetica,sans-serif',
            cursor: "default"
          }} 
        >
          Formula Set Name
        </p>
        <Input 
          value={props.productMR.set || ""} 
          style={{
            background: "#151515",
            color: "white",
            height: "2.73vw"
          }}
          fluid={true}
          disabled
        />
      </div>
      <div>
        <p 
          style={{
            padding: 0,
            margin: 0,
            color: "white",
            fontFamily: '"Honeywell Sans Web",Arial,Helvetica,sans-serif',
            cursor: "default"
          }} 
        >
          Master Recipe Name
        </p>
        <Input 
          value={props.productMR.recipe || ""} 
          style={{
            background: "#151515",
            color: "white",
            height: "2.73vw",
            width: "20vw"
          }}
          disabled
        />
      </div>
      <FormulaSetTable 
        productMR={props.productMR}
        tableData={tableData}
        setTableData={setTableData}
        showViewFormulaSet={props.showViewFormulaSet}
      />
      <div 
        style={{ float: "left" }}
      >
        <Button 
          type="secondary"
          content="Cancel" 
          onClick={() => {
            props.setShowViewFormulaSet(false)
            props.setShowFormulaSets(true)
            setTableData([])
          }}
        />
      </div>
    </div>
  )
}

export default ViewFormulaSet