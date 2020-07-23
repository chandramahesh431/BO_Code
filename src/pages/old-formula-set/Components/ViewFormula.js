import React, { useEffect, useState } from 'react'
import { Input, Button } from '@scuf/common'
import ViewFormulaTable from './ViewFormulaTable'

function ViewFormula(props) {
  const [productName, setProductName] = useState("")
  const [productID, setProductID] = useState("")
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedAll, setSelectedAll] = useState(false)
  const [masterRecipe, setMasterRecipe] = useState("")
  const [version, setVersion] = useState("")
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    let data = []

    async function getFormula() {
      let url = 'http://localhost:5003/api/getformulaparametersofproducttype/' + props.productMR.set + '/' + props.product.productID
      await fetch(url, {
        "headers": {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      .then(response => response.json())
      .then(json => data = json)
      .catch(err => console.log(err))

      setProductName(props.product.productName)
      setProductID(props.product.productID)
      setVersion(props.product.version)
      setMasterRecipe(props.productMR.recipe)

      let new_data = data.map((entry, index) => {
        return (
          {
            no: parseInt(index) + 1,
            item: entry.paramName,
            value: entry.defaultValue,
            unit: entry.engUnit,
            min: entry.minValue,
            max: entry.maxValue,
            scale: entry.scalabale,
            setMin: entry.minFValue,
            setMax: entry.maxFValue,
            desc: entry.paramDescription,
            enumSetName: entry.enumSetName
          }
        )
      })
      let selected = []
      for (let i = 0; i < new_data.length; i += 1) {
        if (parseFloat(new_data[i].value) !== -999) {
          selected.push(new_data[i])
        }
        else {
          new_data[i]['value'] = ""
          new_data[i]['setMin'] = ""
          new_data[i]['setMax'] = ""
        }
      }

      setSelectedRows(selected)
      setTableData(new_data)
    }

    if (props.showViewFormula) {
      getFormula()
    }
    // eslint-disable-next-line
  }, [props.showViewFormula])

  return (
    <div
      style={{
        height: "98%",
        width: "98%",
        margin: "0.4% auto",
        background: "#151515",
        boxSizing: "border-box",
        padding: "0 2%",
        display: props.showViewFormula? "block" : "none"
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
          Formula Name
        </p>
        <Input 
          value={productName} 
          style={{
            background: "#151515",
            color: "white",
            height: "2.73vw"
          }}
          onChange={(value) => setProductName(value)}
          fluid={true}
          disabled
        />
      </div>
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
          Version
        </p>
        <Input 
          style={{
            background: "#151515",
            color: "white",
            height: "2.73vw"
          }}
          fluid={true}
          value={version}
          disabled
        />
      </div>
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
          Master Recipe Name
        </p>
        <Input 
          value={masterRecipe} 
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
          Formula ID
        </p>
        <Input 
          value={productID} 
          style={{
            background: "#151515",
            color: "white",
            height: "2.73vw",
            width: "20vw"
          }}
          onChange={(value) => setProductID(value)}
          disabled
        />
      </div>
      <ViewFormulaTable 
        tableData={tableData}
        setTableData={setTableData}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        selectedAll={selectedAll}
        setSelectedAll={setSelectedAll}
        productMR={props.productMR}
        showViewFormula={props.showViewFormula}
      />
      <div
        style={{ 
          float: "left" 
        }}
      >
        <Button 
          type="secondary"
          content="Cancel"
          onClick={() => {
            props.setShowViewFormula(false)
            setProductName("")
            setProductID("")
            props.setShowFormulas(true)
            setSelectedRows([])
            setSelectedAll(false)
            setMasterRecipe("")
            setTableData([])
            setVersion("")
          }}
        />
      </div>
      <div 
        style={{ 
          float: "right" 
        }}
      >
      </div>
    </div>
  )
}

export default ViewFormula