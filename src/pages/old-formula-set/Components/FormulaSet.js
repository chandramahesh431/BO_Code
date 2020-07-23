import React, { useEffect, useState } from 'react'
import { Input, Button } from '@scuf/common'
import FormulaTable from './FormulaTable'

function FormulaSet(props) {
  const [recipeName, setRecipeName] = useState("")
  const [hasData, setHasData] = useState(false)
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    setRecipeName(props.recipeName)
  }, [props.recipeName])

  return (
    <div
      style={{
        height: "98%",
        width: "90%",
        margin: "0.4% auto",
        background: "#151515",
        boxSizing: "border-box",
        padding: "0 2%",
        display: props.showFormulaSet? "block" : "none"
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
        value={props.productName} 
        style={{
          background: "#151515",
          color: "white",
          cursor: "default",
          height: "5.73vh"
        }}
        disabled
      />
      <FormulaTable 
        strategyID={props.strategyID}
        saveData = {props.saveData}
        setSaveData={props.setSaveData}
        productName={props.productName}
        recipeName={recipeName}
        setHasData={setHasData}
        imported={props.imported}
        setImported={props.setImported}
        tableData={tableData}
        setTableData={setTableData}
      />
      <div 
        style={{ float: "right" }}
      >
        <Button 
          type="primary"
          content="Save Formula Set" 
          disabled={!hasData}
          onClick={() => {
            props.setAllowPost(true)
            setHasData(false)
            setTableData([])
          }}
        />
      </div>
    </div>
  )
}

export default FormulaSet