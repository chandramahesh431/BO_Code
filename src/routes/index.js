import React from "react";
import CreateFormulaSet from "../../src/pages/old-formula-set/Components/CreateFormulaSet";
import FormulaSet from "../../src/pages/old-formula-set/Components/FormulaSet";
import FormulaSets from "../../src/pages/old-formula-set/Components/FormulaSets";
import CreateProduct from "../../src/pages/old-formula-set/Components/CreateProduct";
import Formulas from "../../src/pages/old-formula-set/Components/Formulas";
import CreateSimilarFormula from "../../src/pages/old-formula-set/Components/CreateSimilarFormula";
import ModifyFormula from "../../src/pages/old-formula-set/Components/ModifyFormula";
import ViewFormula from "../../src/pages/old-formula-set/Components/ViewFormula";
import ViewFormulaSet from "../../src/pages/old-formula-set/Components/ViewFormulaSet";
import { Switch, Route, Redirect } from "react-router-dom";

const Routes = (props) => {
  const {
    setSelected,
    setProductName,
    setImported,
    setProductMR,
    productName,
    strategyID,
    setAllowPost,
    recipeName,
    imported,
    saveData,
    setSaveData,
    productMR,
    setShowFormulaSets,
    setProduct,
    product,
  } = props;
  return (
    <Switch>
      <Route
        path="/Formulas/createFormulaSet"
        exact
        render={() => {
          return (
            <CreateFormulaSet
              {...props}
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
      <Redirect to="/Formulas"></Redirect>
    </Switch>
  );
};

export default Routes;
