import React from 'react'
import styled, {css} from "styled-components"
import { device } from 'lib/mediaDevice'
import './style.css'
import arrowRight from "../../../static/img/icons/arrow-right.png";

export const Button = (
    {
        type,
        variant = 'contained',
        color = 'blue', // blue, green, red
        size = 'medium' ,
        disabled,
        isLoading,
        startIcon,
        endIcon,
        onClick,
        isUpperCase,
        isHeaderBtn,
        children
    }) => {

    return (
        <StyledButton
            type={type}
            variant={variant}
            color={color}
            size={size}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            disabled={disabled || isLoading}
            isLoading={isLoading}
            isUpperCase={isUpperCase}
            isHeaderBtn={isHeaderBtn}
        >
            {children}
            {isLoading &&  <SpinnerBox><Spinner /></SpinnerBox>}
        </StyledButton>
    )
}

export const ButtonIcon = (
    {
        type,
        disabled,
        isLoading,
        onClick,
        icon
    }) => {

    return (
        <StyledButtonIcon
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            isLoading={isLoading}
        >
            <img src={icon} alt=""/>
            {isLoading &&  <SpinnerBox><Spinner /></SpinnerBox>}
        </StyledButtonIcon>
    )
}


export const StyledButton = styled.button`
    position: relative;
    height: 68px;
    font-size: 20px;
    color: #ffffff;
    background-color: var(--blue);
    outline: none;
    padding: 0 30px;
    border: none;
    border-radius: 34px;
    text-transform: ${p => p.isUpperCase? 'uppercase' : ''};
  
    :hover {
        cursor: pointer;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
    }
    :disabled {
        cursor: ${p => p.isLoading? 'progress' : 'not-allowed'};
        opacity: 0.5;
    }
    
    ${(p) => p.color === 'green' && css`
        background-color: var(--green);
        
        &:hover {
            background-color: var(--green-hover);
        }
    `}
    
    ${(p) => p.color === 'red' && css`
        background-color: var(--red);
        
        &:hover {
            background-color: var(--red-hover);
        }
    `}
    
  
    ${(p) =>
    p.size === 'small' &&
    css`
        height: 32px;
        border-radius: 16px;
        padding: 0 20px;
        font-size: 12px;
    `}
    
    @media ${device.laptop} { 
        height: 54px;
        font-size: 17px;
    }
    
    @media ${device.mobile} { 
        height: 52px;
    }
`

const StyledButtonIcon  = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    color: #ffffff;
    background-color: var(--blue);
    box-shadow: var(--shadow-card);
    outline: none;
    border: none;
    font-size: 20px;
    
    :disabled {
      opacity: 0.7;
    }
`

const SpinnerBox = styled.span`
    display: inline-block;
    width: 24px;
    height: 24px;
    //background-color: grey;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -12px;
    margin-left: -12px;
`

const Spinner = () => <svg className="circular" viewBox="22 22 44 44">
    <circle className="path" fill="none" r="20" cx="44" cy="44" strokeWidth="3"/>
</svg>