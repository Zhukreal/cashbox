import React from 'react'
import styled, {css} from "styled-components"
import InputMask from 'react-input-mask';
import { device } from 'lib/mediaDevice'
import searchIcon from 'static/img/icons/search.png'

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
    isUnderline,
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
                    error={error}
                    isSearch={isSearch}
                    isUnderline={isUnderline}
                />
            }
            {(isSearch && !value) && <SearchIcon src={searchIcon} />}
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
     -webkit-appearance: none;
     -moz-appearance: none;
    ::-webkit-input-placeholder {color: rgba(14,37,74,0.302);}
    ::-moz-placeholder          {color: rgba(14,37,74,0.302);}/* Firefox 19+ */
    :-moz-placeholder           {color: rgba(14,37,74,0.302);}/* Firefox 18- */
    :-ms-input-placeholder      {color: rgba(14,37,74,0.302);}
    :read-only {
        background: #f3f3f3;
        cursor: not-allowed;
    }
    
    
    
    ${(p) =>
    p.isUnderline &&
    css`
        border: none;
        border-bottom: 2px solid ${p => p.error ? `var(--red)`  : `var(--canvas-text)` } ;
        border-radius: 0!important;
        background: none;
        box-shadow: none; 
        padding-top: 20px!important;
          
    `}
    
    
    @media ${device.laptop} { 
            font-size: 16px;
            height: 54px;
            border-radius: 20px;
            padding: 0 25px;
        }
    
    @media ${device.mobileTablet} { 
        height: 40px;
        border-radius: 20px;
        padding: 0 20px;
        font-size: 16px;
    }
    
    ${(p) =>
    p.isSearch &&
    css`
        border: none;
        height: 68px;
        border-radius: 22px;
        padding: 0 25px 0 25px;
        font-size: 20px;
        
        ::-webkit-input-placeholder {
          font-family: 'GilroyBold', sans-serif;
          color: rgba(14,37,74,0.302);
        }
        ::-moz-placeholder          {
            font-family: 'GilroyBold', sans-serif;
            color: rgba(14,37,74,0.302);
        }
        :-moz-placeholder           {
            font-family: 'GilroyBold', sans-serif;
            color: rgba(14,37,74,0.302);
        }
        :-ms-input-placeholder      {
            font-family: 'GilroyBold', sans-serif;
            color: rgba(14,37,74,0.302);
        }
        
        @media ${device.laptop} { 
            font-size: 16px;
            height: 54px;
            border-radius: 20px;
        }
        @media ${device.mobileTablet} { 
            height: 46px;
            border-radius: 20px;
        }
    `}
    
    
`

export const StyledInput = styled.input`
    ${sharedStyle}
`

export const StyledInputMask = styled(InputMask)`
    ${sharedStyle}
`

export const BoxInput = styled.div`
    width: 100%;
    position: relative;
  
    ${(p) =>
    p.isForm &&
    css`
      margin-bottom: 30px;
    `}
  
`

const Error = styled.div`
    position: absolute;
    bottom: -13px;
    font-size: 11px;
    color: #ff3939;
    right: auto;
    left: auto;
    text-align: center;
    width: 100%;
`

const SearchIcon = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 20px;
  top: 25px;
  
  @media ${device.mobileTablet} { 
        width: 16px;
        height: 16px;
        right: 14px;
        top: 14px;
    }
    
    @media ${device.laptop} { 
        width: 18px;
        height: 18px;
        right: 18px;
        top: 18px
    }
    
  
`
