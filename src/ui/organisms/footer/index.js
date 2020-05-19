import React from 'react'
import styled from 'styled-components'
import { Container } from 'ui'

export const Footer = () => {
  return (
    <FooterBox>
      <Container>footer</Container>
    </FooterBox>
  )
}

export const FooterBox = styled.div`
  height: 5rem;
  display: flex;
  justify-content: center;
  background-color: #a7dcff;
`
