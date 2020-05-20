import React, { useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './styles.css'

export const InputDatepicker = ({ selected, onChange, placeholderText }) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      placeholderText={placeholderText}
      showYearDropdown
      dropdownMode="select"
    />
  )
}
