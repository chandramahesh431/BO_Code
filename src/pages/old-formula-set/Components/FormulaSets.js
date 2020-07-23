import React, { useState, useEffect } from "react";
import { DataTable } from "@scuf/datatable";
import { Button } from "@scuf/common";
import "@scuf/datatable/honeywell-compact-dark/theme.css";
import { useHistory } from "react-router-dom";

function FormulaSets(props) {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  let history = useHistory();

  useEffect(() => {
    let formulaSets = [];

    async function getFormulaSets() {
      await fetch("http://localhost:5003/api/getformulaset", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          formulaSets = json;
        })
        .catch((err) => console.log(err));
      if (
        formulaSets !== null &&
        formulaSets !== {} &&
        formulaSets.length > 0
      ) {
        let MasterRecipes = formulaSets.map((entry) => {
          return {
            set: entry.productTypName,
            recipe: entry.recipeName,
            number: entry.formulaSet.length,
            creator: entry.createdby,
            date: null,
            id: entry.recipeID,
          };
        });

        setData(MasterRecipes);
      }
    }

    if (props.showFormulaSets) {
      getFormulaSets();
    }
  }, [props.showFormulaSets]);

  return (
    <div
      style={{
        width: "98%",
        margin: "1.64vh auto",
        boxSizing: "border-box",
        padding: "0 2%",
        display: props.showFormulaSets ? "block" : "none",
      }}
    >
      <div
        style={{
          marginBottom: "1.64vh",
        }}
      >
        <Button
          type="inline"
          content="View Formula Set"
          disabled={!(selectedRow.length > 0)}
          onClick={() => {
            props.setShowFormulaSets(false);
            props.setShowViewFormulaSet(true);
            props.setProductMR(selectedRow[0]);
            setSelectedRow([]);
            history.push("/Formulas/viewFormulaSet");
          }}
        />
        <Button
          type="inline"
          content="Create Formula"
          disabled={!(selectedRow.length > 0)}
          onClick={() => {
            props.setShowFormulaSets(false);
            props.setShowCreateProduct(true);
            props.setProductMR(selectedRow[0]);
            setSelectedRow([]);
            history.push("/Formulas/createProduct");
          }}
        />
        <Button
          type="inline"
          content="View Formulas"
          disabled={!(selectedRow.length > 0)}
          onClick={() => {
            props.setShowFormulaSets(false);
            props.setShowFormulas(true);
            props.setProductMR(selectedRow[0]);
            setSelectedRow([]);
            history.push("/Formulas");
          }}
        />
      </div>
      <DataTable
        data={data}
        scrollable={true}
        scrollWidth="100%"
        scrollHeight="63.5vh"
        selection={selectedRow}
        selectionMode="single"
        onSelectionChange={(rows) => {
          setSelectedRow(rows);
        }}
        search={true}
        searchPlaceholder="Search for"
      >
        <DataTable.Column field="set" header="FORMULA SET" sortable={true} />
        <DataTable.Column
          field="recipe"
          header="MASTER RECIPE"
          sortable={true}
        />
        <DataTable.Column
          field="number"
          header="NO. OF FORMULAS"
          sortable={true}
        />
        <DataTable.Column field="creator" header="CREATED BY" sortable={true} />
        <DataTable.Column field="date" header="DATE MODIFIED" sortable={true} />
      </DataTable>
    </div>
  );
}

export default FormulaSets;
