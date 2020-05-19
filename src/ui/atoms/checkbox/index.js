import React from 'react'

export const Checkbox = ({ name, value, onChange }) => {
  return <input color="primary" name={name} value={value} onChange={onChange} />
}

export const CheckboxWithLabel = ({ label, ...props }) => {
  return <input />
}
