import React from 'react'
// import logo from '../honeywell.png'
import {HONEYWELL_ICON} from '../../../constants/svg-images'
import '../Stylesheets/title-bar.scss'

function TitleBar() {
  return (
    <div className="title">
      <div className="logo">
        <img src={HONEYWELL_ICON} className="logo" alt="logo" />
      </div>
      <div className="heading">
        <h1 className="header">BATCH ORCHESTRATOR</h1>
      </div>
    </div>
  )
}

export default TitleBar