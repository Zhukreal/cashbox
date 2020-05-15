import React from 'react'
import styled, {css} from "styled-components"
import InputMask from 'react-input-mask';
import { device } from 'lib/mediaDevice'
import searchIcon from 'static/img/icons/search.png'

export const Textarea = ({
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
        <StyledTextarea
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
            >
        </StyledTextarea>

    )
}

export const StyledTextarea = styled.textarea`
    width: 100%;
    //height: 165px;
    outline: none;
    padding: 15px 20px;
    font-size: 20px;
    border: 1px solid rgb(14, 37, 74);
    border-radius: 25px;
    color: rgb(14, 37, 74);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
     resize: none;
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
   
   
     @media ${device.mobileTablet} { 
        font-size: 16px;
    }
    
    
    @media ${device.laptop} { 
            font-size: 16px;
            
        }
    
   
    
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
