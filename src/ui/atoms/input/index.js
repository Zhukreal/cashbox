import React from 'react'
import styled, {css} from "styled-components"
import InputMask from 'react-input-mask';
import { device } from 'lib/mediaDevice'
import searchIcon from 'static/img/logo.png'

export const Input = ({
    type,
    name,
    label,
    value,
    onChange,
    placeholder,
                          readOnly,
    size = 'medium',
    isForm,
    isInputMask,
                          isSearch,
    mask,
    alwaysShowMask,
    error
}) => {
    return (
        <BoxInput isForm={isForm} >
            {isInputMask ?
                <StyledInputMask
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    mask={mask}
                    maskChar="_"
                    placeholder={placeholder}
                    alwaysShowMask={alwaysShowMask}
                    readOnly={readOnly}
                />
                :
                <StyledInput
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    size={size}
                    isSearch={isSearch}
                />
            }
            {isSearch && <SearchIcon src={searchIcon} />}
            <Error>{error}</Error>
        </BoxInput>

    )
}

const sharedStyle = css`
    width: 100%;
    height: 68px;
    outline: none;
    padding: 0 34px;
    font-size: 25px;
    border: 1px solid rgb(14, 37, 74);
    border-radius: 34px;
    color: rgb(14, 37, 74);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
    ::-webkit-input-placeholder {color: rgba(14,37,74,0.302);}
    ::-moz-placeholder          {color: rgba(14,37,74,0.302);}/* Firefox 19+ */
    :-moz-placeholder           {color: rgba(14,37,74,0.302);}/* Firefox 18- */
    :-ms-input-placeholder      {color: rgba(14,37,74,0.302);}
    :read-only {
        background: #f3f3f3;
        cursor: not-allowed;
    }
    
    ${(p) =>
    p.isSearch &&
    css`
        border: none;
        height: 52px;
        border-radius: 26px;
        padding: 0 26px;
        font-size: 18px;
    `}
    
    @media ${device.mobile} { 
        height: 52px;
        border-radius: 26px;
        padding: 0 26px;
        font-size: 20px;
    }
`

const StyledInput = styled.input`
    ${sharedStyle}
`

const StyledInputMask = styled(InputMask)`
    ${sharedStyle}
`

export const BoxInput = styled.div`
    width: 100%;
    position: relative;
  
    ${(p) =>
    p.isForm &&
    css`
      margin-bottom: 3rem;
    `}
  
`

const Error = styled.div`
    position: absolute;
    left: 34px;
    bottom: -15px;
    font-size: 1rem;
    color: #ff3939;
`

const SearchIcon = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 20px;
  top: 14px;
`
