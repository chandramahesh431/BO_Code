import React, { useState, useEffect } from 'react'
import { DataTable } from '@scuf/datatable'
import '@scuf/datatable/honeywell-compact/theme.css'

function Recipes(props) {
  const [rows, setRows] = useState([])

  useEffect(() => {
    let data = []
    let recipesList = []
    
    async function getRecipesList() {
      await fetch('http://localhost:5003/api/getdatablocklist', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => recipesList = json)
      .catch(err => console.log(err))
    }

    async function fetchData() {
      await fetch("http://localhost:5003/api/datablock", {
        "headers": {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      .then(response => response.json())      
      .then(json => data = json.slice(0))

      let tableData = []
      for (let i = 0; i < data.length; i += 1) {
        let done = false
        for (let j = 0; j < recipesList.length; j += 1)
        {
          if (data[i].recipeName === recipesList[j]) {
            done = true
            break
          }
        }
        if (done) {
          continue
        }
        tableData.push({
          id: data[i].recipeID,
          mr: data[i].recipeName,
          desc: data[i].description,
          template: data[i].templateName,
          verison: data[i].version,
          proceduralLevel: data[i].proceduralLevel,
          createdby: data[i].createdby,
          publicName: data[i].publicName,
          
        })
      }
      setRows(tableData)
    }

    if (props.showRecipes) {
      getRecipesList()
      fetchData()
    }
  }, [props.showRecipes])

  return (
    <div 
      style={{
        display: props.showRecipes? "block" : "none"
      }}
    >
      <DataTable
        loading={rows.length <= 0}
        data={rows}
        scrollable={true}
        scrollHeight="31.96vh"
        scrollWidth="100%"
        columnResizeMode="expand"
        selection={props.selectedRecipe}
        selectionMode="single"
        onSelectionChange={(row) => props.setSelectedRecipe(row)}
      >
        <DataTable.Column 
          field="mr" 
          header="Master Recipe" 
          sortable={true} 
          // initialWidth="135px"
        />
        <DataTable.Column 
          field="desc" 
          header="Description" 
          sortable={true} 
          // initialWidth="200px" 
        />
      </DataTable>
    </div>
  )
}

export default Recipes