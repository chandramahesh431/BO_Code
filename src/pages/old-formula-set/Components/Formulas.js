import React, { useState, useEffect } from "react";
import { DataTable } from "@scuf/datatable";
import { Button } from "@scuf/common";
import "@scuf/datatable/honeywell-compact-dark/theme.css";
import { useHistory } from "react-router-dom";

function Formulas(props) {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  let history = useHistory();

  useEffect(() => {
    let dat = [];

    async function getData() {
      await fetch("http://localhost:5003/api/getformulaset", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => (dat = json))
        .catch((err) => console.log(err));

      let data2 = [];
      for (let i = 0; i < dat.length; i += 1) {
        if (dat[i].recipeName !== props.productMR.recipe) {
          continue;
        }
        let creator = dat[i].createdby;
        data2 = dat[i].formulaSet.map((entry) => {
          return {
            productName: entry.productName,
            version: entry.version,
            creator: creator,
            productID: entry.productID,
            date: null,
          };
        });
        break;
      }
      setData(data2);
    }
    if (props.showFormulas) {
      getData();
    }
    // eslint-disable-next-line
  }, [props.showFormulas]);

  return (
    <div
      style={{
        width: "98%",
        margin: "1.64vh auto",
        boxSizing: "border-box",
        padding: "0 2%",
        display: props.showFormulas ? "block" : "none",
      }}
    >
      <div
        style={{
          marginBottom: "1.64vh",
        }}
      >
        <Button
          type="inline"
          content="View Formula"
          disabled={!(selectedRow.length > 0)}
          onClick={() => {
            // console.log(selectedRow)
            props.setShowFormulas(false);
            props.setShowViewFormula(true);
            props.setProduct(selectedRow[0]);
            setSelectedRow([]);
            history.push("/Formulas/viewFormula");
          }}
        />
        <Button
          type="inline"
          content="Modify Formula"
          disabled={!(selectedRow.length > 0)}
          onClick={() => {
            // console.log(selectedRow)
            props.setShowFormulas(false);
            props.setShowModifyFormula(true);
            props.setProduct(selectedRow[0]);
            setSelectedRow([]);
            history.push("/Formulas/modifyFormula");
          }}
        />
        <Button
          type="inline"
          content="Make Similar Formula"
          disabled={!(selectedRow.length > 0)}
          onClick={() => {
            props.setShowFormulas(false);
            props.setShowCreateSimilarFormula(true);
            props.setProduct(selectedRow[0]);
            setSelectedRow([]);
            history.push("/Formulas/createSimilarFormula");
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
        onSelectionChange={(row) => {
          setSelectedRow(row);
          // console.log(rows)
        }}
        search={true}
        searchPlaceholder="Search for"
      >
        <DataTable.Column
          field="productName"
          header="FORMULA NAME"
          sortable={true}
        />
        <DataTable.Column field="version" header="VERSION" sortable={true} />
        <DataTable.Column field="creator" header="CREATED BY" sortable={true} />
        <DataTable.Column field="date" header="DATE MODIFIED" sortable={true} />
      </DataTable>
    </div>
  );
}

export default Formulas;
