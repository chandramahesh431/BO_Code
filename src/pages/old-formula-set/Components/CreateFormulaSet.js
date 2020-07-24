import React, { useState, useEffect, useRef } from "react";
import { Card, Button, Input, InputLabel } from "@scuf/common";
import "@scuf/common/honeywell-compact-dark/theme.css";
import Recipes from "./Recipes";
import { getUsers } from "../../../actions/user-management/index";
import { loginSuccessActionCreator } from "../../../actions/authentication/index";
import { connect } from "react-redux";
import UserManagement from "../../user-management/components/users";
import AuthManagement from "../../auth/components/index";
import Localization from "./../../../hoc/localization/index";
import { useHistory } from "react-router-dom";

function CreateFormulaSet(props) {
  const [showRecipes, setShowRecipes] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const [productName, setProductName] = useState("");
  const setSelected = props.setSelected;

  const { getUsers1, loginSuccessActionCreator } = props;
  let history = useHistory();

  const ref = useRef();
  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (
          !ref.current ||
          ref.current.contains(event.target) ||
          event.target.classList[0] === "tab" ||
          event.target.innerHTML === "Create Formula Set" ||
          event.target.parentNode.classList[0] === "sidebar" ||
          event.target.parentNode.parentNode.classList[0] === "sidebar"
        ) {
          return;
        }
        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }
  //useOnClickOutside(ref, () => clearStates());

  useEffect(() => {
    if (selectedRecipe.length > 0) {
      setSelected([selectedRecipe[0].id, selectedRecipe[0].mr]);
    } else {
      setSelected(null);
    }
  }, [selectedRecipe, setSelected]);

  function clearStates() {
    setShowRecipes(false);
    setSelectedRecipe([]);
    setProductName("");
    history.push("/");
    // props.setShowCreateFormulaSet(false);
  }

  return (
    <div
      style={{
        display: props.showCreateFormulaSet ? "block" : "none",
        maxHeight: "92%",
        width: "39%",
        margin: "2% auto",
        padding: 0,
      }}
      ref={ref}
    >
      {/* <UserManagement />
      <AuthManagement /> */}

      <Card
        style={{
          width: "100%",
          overflowX: "hidden",
        }}
        className="card"
      >
        <Card.Header
          title={props.localizeText("CreateFormulaSet")}
          style={{
            fontSize: "2.34vw",
            padding: "1.97vh 1.25vw 0",
          }}
        ></Card.Header>
        <Card.Content
          style={{
            padding: "1.31vh 1.25vw",
            lineHeight: "7.87vh",
          }}
        >
          <div>
            <InputLabel
              label="Formula Set Name"
              style={{
                padding: 0,
                margin: 0,
              }}
              indicator="required"
            />
            <Input
              placeholder="Input"
              fluid={true}
              value={productName}
              onChange={(value) => setProductName(value)}
            />
          </div>
          <InputLabel
            label="Import Master Recipe from"
            style={{
              padding: 0,
              margin: 0,
            }}
          />
          <Button
            type={showRecipes ? "inline" : "inline-secondary"}
            content={
              "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0DATA BLOCK\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"
            }
            textTransform={false}
            onClick={() => setShowRecipes(!showRecipes)}
          />
          <p
            style={{
              display: showRecipes ? "block" : "none",
              margin: 0,
              fontWeight: "bold",
            }}
          >
            Select Data Block
          </p>
          <Recipes
            showRecipes={showRecipes}
            selectedRecipe={selectedRecipe}
            setSelectedRecipe={setSelectedRecipe}
          />
          <div style={{ float: "right" }}>
            <Button
              type="primary"
              content="Import"
              disabled={
                !(productName.length !== 0 && selectedRecipe.length !== 0)
              }
              onClick={() => {
                props.setShowFormulaSet(true);
                props.setProductName(productName ? productName : "");
                props.setImported(true);
                clearStates();
              }}
            />
            <Button
              type="secondary"
              content="Cancel"
              onClick={() => {
                clearStates();
              }}
            />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers1: () => dispatch(getUsers()),
    loginSuccessActionCreator: () => dispatch(loginSuccessActionCreator()),
  };
};
//export default CreateFormulaSet
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Localization(CreateFormulaSet));
