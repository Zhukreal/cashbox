import React from "react"
import styled from "styled-components"

export const CenterContentTemplate = ({ children }) => (
    <CenterContent>
       {children}
    </CenterContent>
)

export const CenterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow-y: auto;
  min-height: 100vh;
  // flex-direction: column;
  width: 100%;
  color: var(--canvas-text);
  background-color: var(--canvas);
`
