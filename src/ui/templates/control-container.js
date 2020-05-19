import React from 'react'
import styled from 'styled-components'

export const ControlContainerTemplate = ({ children }) => (
  <ControlContainer>{children}</ControlContainer>
)

const ControlContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`
