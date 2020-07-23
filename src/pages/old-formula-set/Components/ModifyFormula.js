import React, { useEffect, useState } from 'react'
import { Input, Button } from '@scuf/common'
import ModifyFormulaTable from './ModifyFormulaTable'

function ModifyFormula(props) {
  const [productName, setProductName] = useState("")
  const [productID, setProductID] = useState("")
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedAll, setSelectedAll] = useState(false)
  const [allowSave, setAllowSave] = useState(false)
  const [masterRecipe, setMasterRecipe] = useState("")
  const [allowPost, setAllowPost] = useState(false)
  const [postData, setPostData] = useState([])
  const [version, setVersion] = useState("")
  const [tableData, setTableData] = useState([])
  const [formulaSetNumber, setFormulaSetNumber] = useState(-1)
  const [formulaNumber, setFormulaNumber] = useState(-1)
  const [formula, setFormula] = useState({})

  useEffect(() => {
    async function postProduct(saveData) {
      await fetch('http://localhost:5003/api/createformulaset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saveData)
      })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(err => console.log(err))
    }

    if (allowPost) {
      let new_data = postData.slice(0)
      let formulaParameters = formula.slice(0)

      for (let i = 0; i < formulaParameters.length; i += 1) {
        let found = false
        for (let j = 0; j < selectedRows.length; j += 1)
        {
          if (formulaParameters[i].paramName === selectedRows[j].item) {
            let row = selectedRows[j]
            formulaParameters[i] = {
              paramName: row.item,
              defaultValue: parseFloat(row.value),
              engUnit: row.unit,
              minValue: row.min,
              maxValue: row.max,
              scalabale: row.scale,
              minFValue: isNaN(parseFloat(row.setMin))? row.min : parseFloat(row.setMin),
              maxFValue: isNaN(parseFloat(row.setMax))? row.max : parseFloat(row.setMax),
              paramDescription: row.desc,
              enumSetName: row.enumSetName  
            }
            found = true
            break
          }
        }

        if (!found) {
          formulaParameters[i]['defaultValue'] = -999
          formulaParameters[i]['minFValue'] = -999
          formulaParameters[i]['maxFValue'] = -999          
        }
      }

      let new_entry = {
        productName: productName,
        productID: productID,
        version: 1,
        formulaParameters: formulaParameters,
        productTypeName: masterRecipe
      }
      new_data[formulaSetNumber].formulaSet[formulaNumber] = new_entry
      postProduct(new_data)
      setAllowPost(false)
      setAllowSave(false)
      setMasterRecipe("")
      setPostData([])
      setSelectedAll(false)
      setSelectedRows([])
      setProductID("")
      setProductName("")
      setTableData([])
      setVersion("")
      props.setShowModifyFormula(false)
      props.setShowFormulas(true)
    }
    // eslint-disable-next-line
  }, [allowPost])

  useEffect(() => {
    let data = []
    async function getFormula() {
      await fetch("http://localhost:5003/api/getformulaset", {
        "headers": {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      .then(response => response.json())
      .then(json => data = json)
      .catch(err => console.log(err))
      console.log(data)
      setPostData(data)
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].recipeName !== props.productMR.recipe) {
          continue
        }
        setFormulaSetNumber(i)
        setFormula(data[i].masterFormulaParameters)
        for (let j = 0; j < data[i].formulaSet.length; j += 1) {
          console.log(data[i].formulaSet[j])
          console.log(props.product.productID)  
          console.log(j)
          if (data[i].formulaSet[j].productID !== props.product.productID) {
            continue
          }
          setFormulaNumber(j)
          setProductName(data[i].formulaSet[j].productName)
          setProductID(data[i].formulaSet[j].productID)
          setVersion(data[i].formulaSet[j].version)
          setMasterRecipe(data[i].recipeName)
          let old_data = data[i].formulaSet[j].formulaParameters
          let new_data = old_data.map((entry, index) => {
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
          for (let k = 0; k < new_data.length; k += 1) {
            if (parseFloat(new_data[k].value) !== -999) {
              selected.push(new_data[k])
            }
            else {
              new_data[k]['value'] = ""
              new_data[k]['setMin'] = ""
              new_data[k]['setMax'] = ""
            }
          }
    
          setSelectedRows(selected)
          setTableData(new_data)
          break
        }
        break
      }
    }

    if (props.showModifyFormula) {
      getFormula()
    }
    // eslint-disable-next-line
  }, [props.showModifyFormula])

  return (
    <div
      style={{
        height: "98%",
        width: "98%",
        margin: "0.4% auto",
        background: "#151515",
        boxSizing: "border-box",
        padding: "0 2%",
        display: props.showModifyFormula? "block" : "none"
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
        />
      </div>
      <ModifyFormulaTable 
        tableData={tableData}
        setTableData={setTableData}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        selectedAll={selectedAll}
        setSelectedAll={setSelectedAll}
        setAllowSave={setAllowSave}
        productMR={props.productMR}
        showModifyFormula={props.showModifyFormula}
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
            props.setShowModifyFormula(false)
            setProductName("")
            setProductID("")
            props.setShowFormulas(true)
            setSelectedRows([])
            setSelectedAll(false)
            setAllowSave(false)
            setMasterRecipe("")
            setAllowPost(false)
            setPostData([])
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
        <Button 
          type="secondary"
          content="Save Formula" 
          disabled={!(productName.length > 0 && productID.length > 0 && allowSave)}
          onClick={() => {
            setAllowPost(true)
          }}
        />
      </div>
    </div>
  )
}

export default ModifyFormula