import React from 'react'
import styled, {css} from "styled-components";
import leftArrow from 'static/img/icons/arrow-left.svg'
import addPerson from 'static/img/icons/add-person.svg'
import closeGray from 'static/img/icons/close.svg'
import rightArrowWhite from 'static/img/icons/arrow-right-white.svg'


export const IconArrowLeft = ({...props}) => {
    return (
        <StyledIconLeft {...props}>
            <img src={leftArrow} alt=""/>
        </StyledIconLeft>
    )
}

export const IconAddPerson = ({...props}) => {
    return (
        <StyledIconPerson {...props}>
            <img src={addPerson} alt=""/>
        </StyledIconPerson>
    )
}
export const IconClearClient = ({...props}) => {
    return (
        <StyledIconClearClient {...props}>
            <img src={closeGray} alt=""/>
        </StyledIconClearClient>
    )
}
export const IconArrowRight = ({children, ...props}) => {
    return (
        <StyledIconRight {...props}>
            <img src={rightArrowWhite} alt=""/>
            {children}
        </StyledIconRight>
    )
}


const centerFlex = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledIconLeft = styled.div`
    ${centerFlex};
    position: relative;
    height: 50px;
    width: 50px;
    border-radius: 25px;
    background-color: #ffffff;
    box-shadow: var(--shadow-card);
`

export const StyledIconPerson = styled(StyledIconLeft)``
export const StyledIconClearClient = styled(StyledIconLeft)`
  img {
    width: 21px;
    height: 21px;
    transform: rotate(45deg);
  }
`
export const StyledIconRight = styled(StyledIconLeft)`
  background-color: var(--blue);
  ${p => p.disabled && css `
    opacity: 0.5;
`}
`

