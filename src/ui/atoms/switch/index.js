import React from 'react'
import './style.css'

export const Switch = ({ name, checked, value, onChange, disabled }) => {
  return (
    <label className="z-switch" >
      <input type="checkbox" className="z-switch-checkbox" onChange={onChange} checked={checked} />
      <span className="z-slider round"></span>
    </label>
  )
}
