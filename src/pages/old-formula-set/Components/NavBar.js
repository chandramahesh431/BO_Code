import React, { useState } from 'react'
import SubNavBar from './SubNavBar'
import '../Stylesheets/NavBar.css'

function NavBar(props) {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div 
      className="navbar" 
    >
      <div className="tab tab-1">Physical Model</div>
      <div className="tab tab-2">Procedural Model</div>
      <div 
        className="tab tab-3" 
        onClick={() => setShowOptions(!showOptions)}
      >
        Formulas
      </div>
      <SubNavBar
        showOptions={showOptions}
        setShowOptions={setShowOptions}
        showCreateFormulaSet={props.showCreateFormulaSet}
        setShowCreateFormulaSet={props.setShowCreateFormulaSet}
        setShowFormulaSet={props.setShowFormulaSet}
        showFormulaSets={props.showFormulaSets}
        setShowFormulaSets={props.setShowFormulaSets}
        setShowFormulas={props.setShowFormulas}
        setShowCreateProduct={props.setShowCreateProduct}
      />
      <div className="tab tab-4">Campaigns</div>
      <div className="tab tab-5">Work Instructions</div>
      <div className="tab tab-6">Materials</div>
      <div className="tab tab-7">W&amp;D</div>
      <div className="tab tab-8">Production Plannning</div>
      <div className="tab tab-9">EBR</div>
    </div>
  )
}

export default NavBar