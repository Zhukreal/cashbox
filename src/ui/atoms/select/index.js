import React from 'react'
import styled, { css } from 'styled-components'
import { device } from 'lib/mediaDevice'

export const Select = ({
  name,
  value,
  onChange,
  options,
  placeholder,
  isUnderline,
}) => {
  return (
    <StyledSelect
      name={name}
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      isUnderline={isUnderline}
    >
      <option value="" disabled selected>
        {placeholder}
      </option>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </StyledSelect>
  )
}

export const StyledSelect = styled.select`
  width: 100%;
  height: 68px;
  background: none;
  border: none;
  border-radius: 0;
  -webkit-appearance: none;
  -webkit-border-radius: 0px;
  border-bottom: 2px solid var(--canvas-text);
  font-size: 25px;
  padding-top: 20px;
  padding-left: 10px;
  //text-align-last: center;
  position: relative;

  color: ${(p) => (p.value ? 'inherit' : 'rgba(14,37,74,0.302)')};

  @media ${device.mobileTablet} {
    height: 40px;
    font-size: 16px;
    border-bottom: none;
    box-shadow: var(--shadow-card);
    //padding-top: 5px;
    border-radius: 20px;
    padding: 0 20px!important;
  }

  @media ${device.laptop} {
    font-size: 16px;
    height: 54px;
  }
`
