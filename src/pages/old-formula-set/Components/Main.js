import React, { useState, useEffect } from "react";
import "../Stylesheets/Main.css";
// import CreateFormulaSet from "./CreateFormulaSet";
// import FormulaSet from "./FormulaSet";
// import FormulaSets from "./FormulaSets";
// import CreateProduct from "./CreateProduct";
// import Formulas from "./Formulas";
// import CreateSimilarFormula from "./CreateSimilarFormula";
// import ModifyFormula from "./ModifyFormula";
// import ViewFormula from "./ViewFormula";
// import ViewFormulaSet from "./ViewFormulaSet";
// import { Route, Redirect, Switch } from "react-router-dom";
import Routes from "../../../routes";

function Main(props) {
  const [selected, setSelected] = useState(null);
  const [productName, setProductName] = useState("");
  const [strategyID, setStrategyID] = useState(null);
  const [recipeName, setRecipeName] = useState("");
  const [imported, setImported] = useState(false);
  const [saveData, setSaveData] = useState([]);
  const [allowPost, setAllowPost] = useState(false);
  const [productMR, setProductMR] = useState({});
  const [product, setProduct] = useState({});

  const setShowFormulaSet = props.setShowFormulaSet;
  const setShowFormulaSets = props.setShowFormulaSets;

  useEffect(() => {
    async function postData() {
      await fetch("http://localhost:5003/api/createformulaset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saveData),
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => console.log(err));
    }

    if (allowPost) {
      console.log(saveData);
      postData();
      setShowFormulaSet(false);
      setShowFormulaSets(true);
      setAllowPost(false);
    }
  }, [
    allowPost,
    saveData,
    setShowFormulaSet,
    setShowFormulaSets,
    setAllowPost,
  ]);

  useEffect(() => {
    if (selected !== null) {
      setStrategyID(selected[0].toString());
      setRecipeName(selected[1].toString());
    } else {
      setStrategyID(null);
    }
  }, [selected]);

  return (
    <div className="main">
      <Routes
        setSelected={setSelected}
        setProductName={setProductName}
        setImported={setImported}
        setProductMR={setProductMR}
        productName={productName}
        strategyID={strategyID}
        recipeName={recipeName}
        imported={imported}
        saveData={saveData}
        setSaveData={setSaveData}
        productMR={productMR}
        setShowFormulaSets={setShowFormulaSets}
        setProduct={setProduct}
        product={product}
        setShowCreateFormulaSet={props.setShowCreateFormulaSet}
        setShowFormulaSet={props.setShowFormulaSet}
        setShowViewFormulaSet={props.setShowViewFormulaSet}
        setShowFormulaSets={props.setShowViewFormulaSet}
        setShowCreateProduct={props.setShowCreateProduct}
        setShowCreateSimilarFormula={props.setShowCreateSimilarFormula}
        setShowModifyFormula={props.setShowModifyFormula}
        setShowViewFormula={props.setShowViewFormula}
        setShowFormulas={props.setShowFormulas}
      ></Routes>
      {/* <Switch>
        <Route
          path="/Formulas/createFormulaSet"
          exact
          render={() => {
            return (
              <CreateFormulaSet
                showCreateFormulaSet={true}
                setShowCreateFormulaSet={props.setShowCreateFormulaSet}
                setSelected={setSelected}
                setShowFormulaSet={props.setShowFormulaSet}
                setProductName={setProductName}
                setImported={setImported}
              />
            );
          }}
        />
        <Route
          path="/Formulas/manageFormula"
          exact
          render={() => {
            return (
              <FormulaSets
                showFormulaSets={true}
                setShowFormulaSets={props.setShowFormulaSets}
                setShowCreateProduct={props.setShowCreateProduct}
                setProductMR={setProductMR}
                setShowFormulas={props.setShowFormulas}
                setShowViewFormulaSet={props.setShowViewFormulaSet}
              />
            );
          }}
        />
        <Route
          path="/Formulas/formulaSet"
          exact
          render={() => {
            return (
              <FormulaSet
                showFormulaSet={true}
                productName={productName}
                strategyID={strategyID}
                setAllowPost={setAllowPost}
                setShowFormulaSet={props.setShowFormulaSet}
                recipeName={recipeName}
                imported={imported}
                setImported={setImported}
                saveData={saveData}
                setSaveData={setSaveData}
              />
            );
          }}
        />
        <Route
          path="/Formulas/viewFormulaSet"
          exact
          render={() => {
            return (
              <ViewFormulaSet
                showViewFormulaSet={true}
                productMR={productMR}
                setShowViewFormulaSet={props.setShowViewFormulaSet}
                setShowFormulaSets={props.setShowFormulaSets}
              />
            );
          }}
        />
        <Route
          path="/Formulas/createProduct"
          exact
          render={() => {
            return (
              <CreateProduct
                showCreateProduct={true}
                setShowCreateProduct={props.setShowCreateProduct}
                productMR={productMR}
                setShowFormulaSets={setShowFormulaSets}
                setShowFormulas={props.setShowFormulas}
              />
            );
          }}
        />
        <Route
          path="/Formulas"
          exact
          render={() => {
            return (
              <Formulas
                showFormulas={true}
                setShowFormulas={props.setShowFormulas}
                setShowCreateProduct={props.setShowCreateProduct}
                setShowFormulaSets={setShowFormulaSets}
                setProductMR={setProductMR}
                productMR={productMR}
                setShowCreateSimilarFormula={props.setShowCreateSimilarFormula}
                setShowModifyFormula={props.setShowModifyFormula}
                setShowViewFormula={props.setShowViewFormula}
                setProduct={setProduct}
              />
            );
          }}
        />
        <Route
          path="/Formulas/createSimilarFormula"
          exact
          render={() => {
            return (
              <CreateSimilarFormula
                showCreateSimilarFormula={true}
                setShowCreateSimilarFormula={props.setShowCreateSimilarFormula}
                setShowFormulas={props.setShowFormulas}
                productMR={productMR}
                product={product}
              />
            );
          }}
        />
        <Route
          path="/Formulas/modifyFormula"
          exact
          render={() => {
            return (
              <ModifyFormula
                showModifyFormula={true}
                setShowModifyFormula={props.setShowModifyFormula}
                setShowFormulas={props.setShowFormulas}
                productMR={productMR}
                product={product}
              />
            );
          }}
        />
        <Route
          path="/Formulas/viewFormula"
          exact
          render={() => {
            return (
              <ViewFormula
                showViewFormula={true}
                setShowViewFormula={props.setShowViewFormula}
                setShowFormulas={props.setShowFormulas}
                productMR={productMR}
                product={product}
              />
            );
          }}
        />
        <Redirect from="/" exact to="/Formulas"></Redirect>
      </Switch> */}

      {/* {
      useLocation().pathname==="/Formulas/createFormulaSet" &&<Route path="/Formulas/createFormulaSet" exact render={(props)=>{
        console.log("props",props);
        let showCreateFormulaSet = props.showCreateFormulaSet===true ? props.showCreateFormulaSet : props.location && props.location.state.showCreateFormulaSet
        // console.log("props",props);

        return  <CreateFormulaSet 
        showCreateFormulaSet={showCreateFormulaSet} 
        setShowCreateFormulaSet={props.setShowCreateFormulaSet}
        setSelected={setSelected}
        setShowFormulaSet={props.setShowFormulaSet}
        setProductName={setProductName}
        setImported={setImported}
      />}}></Route>} 
      {
      useLocation().pathname!=="/Formulas/createFormulaSet" && <CreateFormulaSet 
        showCreateFormulaSet={props.showCreateFormulaSet} 
        setShowCreateFormulaSet={props.setShowCreateFormulaSet}
        setSelected={setSelected}
        setShowFormulaSet={props.setShowFormulaSet}
        setProductName={setProductName}
        setImported={setImported}
      />}
     
    */}

      {/* <Route path="/Formulas/createFormulaSet" exact render={(props)=>{
        const showCreateFormulaSet = props.showCreateFormulaSet ? props.showCreateFormulaSet : props.location.state.showCreateFormulaSet
        console.log("vall",showCreateFormulaSet)
        return  <CreateFormulaSet
        showCreateFormulaSet={showCreateFormulaSet} 
        setShowCreateFormulaSet={props.setShowCreateFormulaSet}
        setSelected={setSelected}
        setShowFormulaSet={props.setShowFormulaSet}
        setProductName={setProductName}
        setImported={setImported}
      />}}></Route>*/}

      {/* <CreateFormulaSet
        showCreateFormulaSet={props.showCreateFormulaSet} 
        setShowCreateFormulaSet={props.setShowCreateFormulaSet}
        setSelected={setSelected}
        setShowFormulaSet={props.setShowFormulaSet}
        setProductName={setProductName}
        setImported={setImported}
      />  */}
      {/* <FormulaSet 
        showFormulaSet={props.showFormulaSet}
        productName={productName}
        strategyID={strategyID}
        setAllowPost={setAllowPost}
        setShowFormulaSet={props.setShowFormulaSet}
        recipeName={recipeName}
        imported={imported}
        setImported={setImported}
        saveData={saveData}
        setSaveData={setSaveData}
      />
      <FormulaSets
        showFormulaSets={props.showFormulaSets}
        setShowFormulaSets={props.setShowFormulaSets}
        setShowCreateProduct={props.setShowCreateProduct}
        setProductMR={setProductMR}
        setShowFormulas={props.setShowFormulas}
        setShowViewFormulaSet={props.setShowViewFormulaSet}
      />
      <ViewFormulaSet 
        showViewFormulaSet={props.showViewFormulaSet}
        productMR={productMR}
        setShowViewFormulaSet={props.setShowViewFormulaSet}
        setShowFormulaSets={props.setShowFormulaSets}
      />
      <CreateProduct
        showCreateProduct={props.showCreateProduct}
        setShowCreateProduct={props.setShowCreateProduct}
        productMR={productMR}
        setShowFormulaSets={setShowFormulaSets}
        setShowFormulas={props.setShowFormulas}
      />
      <Formulas 
        showFormulas={props.showFormulas}
        setShowFormulas={props.setShowFormulas}
        setShowCreateProduct={props.setShowCreateProduct}
        setShowFormulaSets={setShowFormulaSets}
        setProductMR={setProductMR}
        productMR={productMR}
        setShowCreateSimilarFormula={props.setShowCreateSimilarFormula}
        setShowModifyFormula={props.setShowModifyFormula}
        setShowViewFormula={props.setShowViewFormula}
        setProduct={setProduct}
      />
      <CreateSimilarFormula 
        showCreateSimilarFormula={props.showCreateSimilarFormula}
        setShowCreateSimilarFormula={props.setShowCreateSimilarFormula}
        setShowFormulas={props.setShowFormulas}
        productMR={productMR}
        product={product}
      />
      <ModifyFormula 
        showModifyFormula={props.showModifyFormula}
        setShowModifyFormula={props.setShowModifyFormula}
        setShowFormulas={props.setShowFormulas}
        productMR={productMR}
        product={product}
      />
      <ViewFormula
        showViewFormula={props.showViewFormula}
        setShowViewFormula={props.setShowViewFormula}
        setShowFormulas={props.setShowFormulas}
        productMR={productMR}        
        product={product}
      /> */}
    </div>
  );
}

export default Main;
