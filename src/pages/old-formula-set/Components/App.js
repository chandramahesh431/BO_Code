import React, { useState } from 'react'
import '../Stylesheets/App.css'
import TitleBar from './TitleBar'
import SideBar from './SideBar'
import NavBar from './NavBar'
import Main from './Main'
import BreadScrums from "../../breadcrumbs/components";

function App() {
  const [showCreateFormulaSet, setShowCreateFormulaSet] = useState(false)
  const [showFormulaSet, setShowFormulaSet] = useState(false)
  const [showFormulaSets, setShowFormulaSets] = useState(false)
  const [showCreateProduct, setShowCreateProduct] = useState(false)
  const [showFormulas, setShowFormulas] = useState(false)
  const [showCreateSimilarFormula, setShowCreateSimilarFormula] = useState(false)
  const [showModifyFormula, setShowModifyFormula] = useState(false)
  const [showViewFormula, setShowViewFormula] = useState(false)
  const [showViewFormulaSet, setShowViewFormulaSet] = useState(false)


  return (
    <div className="containerApp">
      <TitleBar />      
      <SideBar />
      <BreadScrums/>

      <NavBar 
        showCreateFormulaSet={showCreateFormulaSet}
        setShowCreateFormulaSet={setShowCreateFormulaSet} 
        setShowFormulaSet={setShowFormulaSet}
        showFormulaSets={showFormulaSets}
        setShowFormulaSets={setShowFormulaSets}
        setShowCreateProduct={setShowCreateProduct}
        setShowFormulas={setShowFormulas}
      />
      <Main 
        showCreateFormulaSet={showCreateFormulaSet} 
        setShowCreateFormulaSet={setShowCreateFormulaSet}
        showFormulaSet={showFormulaSet}
        setShowFormulaSet={setShowFormulaSet}
        showFormulaSets={showFormulaSets}
        setShowFormulaSets={setShowFormulaSets}
        showCreateProduct={showCreateProduct}
        setShowCreateProduct={setShowCreateProduct}
        showFormulas={showFormulas}
        setShowFormulas={setShowFormulas}
        showCreateSimilarFormula={showCreateSimilarFormula}
        setShowCreateSimilarFormula={setShowCreateSimilarFormula}
        showModifyFormula={showModifyFormula}
        setShowModifyFormula={setShowModifyFormula}
        showViewFormula={showViewFormula}
        setShowViewFormula={setShowViewFormula}
        showViewFormulaSet={showViewFormulaSet}
        setShowViewFormulaSet={setShowViewFormulaSet}
      />
    </div>
  )
}

export default App