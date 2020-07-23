import React, { useRef, useEffect } from "react";
import "../Stylesheets/SubNavBar.css";
import { useHistory } from "react-router-dom";

function SubNavBar(props) {
  const ref = useRef();
  let history = useHistory();

  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (
          !ref.current ||
          ref.current.contains(event.target) ||
          event.target.innerText === "Formulas"
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

  useOnClickOutside(ref, () => props.setShowOptions(false));

  return (
    <div
      className={props.showOptions ? "opt opt-3 grid" : "opt opt-3 none"}
      ref={ref}
    >
      <ul>
        <li
          onClick={() => {
            props.setShowOptions(!props.showOptions);
            props.setShowFormulaSet(false);
            props.setShowFormulaSets(false);
            props.setShowCreateProduct(false);
            props.setShowFormulas(false);
            props.setShowCreateFormulaSet(true);
            history.push("/Formulas/createFormulaSet");
          }}
        >
          Create Formula Set
        </li>
        <li>Create Formula</li>
        <li
          onClick={() => {
            props.setShowOptions(!props.showOptions);
            props.setShowCreateFormulaSet(false);
            props.setShowFormulaSet(false);
            props.setShowFormulaSets(true);
            props.setShowCreateProduct(false);
            props.setShowFormulas(false);
            history.push("/Formulas/manageFormula");
          }}
        >
          Manage Formula
        </li>
        <li>Approve Formula</li>
      </ul>
    </div>
  );
}

export default SubNavBar;
