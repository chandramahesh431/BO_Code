import React from 'react'
import { Icon } from '@scuf/common'
import '../Stylesheets/SideBar.css'

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidetab sidetab-1">
        <Icon root="common" name="calendar" size="medium" />
      </div>
      <div className="sidetab sidetab-2">
        <Icon root="common" name="file-download" size="medium" />
      </div>
      <div className="sidetab sidetab-3">
        <Icon root="common" name="exit" size="medium" />
      </div>
      <div className="sidetab sidetab-4">
        <Icon root="common" name="template" size="medium" />
      </div>
      <div className="sidetab sidetab-5">
        <Icon root="common" name="document-blank" size="medium" />
      </div>
      <div className="sidetab sidetab-6">
        <Icon root="common" name="checkbox" size="medium" />
      </div>
      <div className="sidetab sidetab-7">
        <Icon root="common" name="badge-help" size="medium" />
      </div>
      <div className="sidetab sidetab-8">
        <Icon root="common" name="settings" size="medium" />
      </div>
    </div>
  )
}

export default SideBar