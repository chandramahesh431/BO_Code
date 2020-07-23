import React, { useEffect, useState } from 'react'
import { Input, Button } from '@scuf/common'
import ProductTable from './ProductTable'

function CreateProduct(props) {
  const [productName, setProductName] = useState("")
  const [productID, setProductID] = useState("")
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedAll, setSelectedAll] = useState(false)
  const [allowSave, setAllowSave] = useState(false)
  const [masterRecipe, setMasterRecipe] = useState("")
  const [allowPost, setAllowPost] = useState(false)
  const [postData, setPostData] = useState([])

  useEffect(() => {
    async function createFormula(saveData) {
      console.log(saveData)
      await fetch('http://localhost:5003/api/createformula', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saveData)
      })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(err => console.log(err))
    }

    if (allowPost) {
      let formulaParameters = postData.slice(0)

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
        productTypeName: props.productMR.set
      }
      
      createFormula(new_entry)
      setAllowPost(false)
      setAllowSave(false)
      setMasterRecipe("")
      setPostData([])
      setSelectedAll(false)
      setSelectedRows([])
      setProductID("")
      setProductName("")
      props.setShowCreateProduct(false)
      props.setShowFormulas(true)
    }
    // eslint-disable-next-line
  }, [allowPost, masterRecipe, postData, productID, productName, selectedRows])

  useEffect(() => {
    if (Object.keys(props.productMR).length > 0 && props.productMR.constructor === Object) {
      setMasterRecipe(props.productMR.recipe)
    }
  }, [props.productMR])

  return (
    <div
      style={{
        height: "98%",
        width: "98%",
        margin: "0.4% auto",
        background: "#151515",
        boxSizing: "border-box",
        padding: "0 2%",
        display: props.showCreateProduct? "block" : "none"
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
      <ProductTable 
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        selectedAll={selectedAll}
        setSelectedAll={setSelectedAll}
        setAllowSave={setAllowSave}
        productMR={props.productMR}
        showCreateProduct={props.showCreateProduct}
        setPostData={setPostData}
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
            props.setShowCreateProduct(false)
            setProductName("")
            setProductID("")
            props.setShowFormulaSets(true)
            setSelectedRows([])
            setSelectedAll(false)
            setAllowSave(false)
            setMasterRecipe("")
            setAllowPost(false)
            setPostData([])
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

export default CreateProduct