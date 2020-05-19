import React from 'react'
import styled from 'styled-components'
import { device } from 'lib/mediaDevice'
import { Button, StyledButton, IconArrowRight } from 'ui'

export const FooterMobile = ({ title, onOk, disabled, isLoading }) => {
  return (
    <Footer>
      <Title>{title}</Title>
      <IconArrowRight onClick={onOk} disabled={disabled}>
        {isLoading && (
          <SpinnerBox>
            <Spinner />
          </SpinnerBox>
        )}
      </IconArrowRight>
    </Footer>
  )
}

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8%;
`
const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: var(--blue);
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

const Spinner = () => (
  <svg className="circular" viewBox="22 22 44 44">
    <circle
      className="path"
      fill="none"
      r="20"
      cx="44"
      cy="44"
      strokeWidth="3"
    />
  </svg>
)
