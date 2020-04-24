import React from "react"
import styled from "styled-components"
import {Button, StyledButton} from 'ui'

export const CardTemplate = ({ children }) => (
    <Card>
        {children}
    </Card>
)

export const Card = styled.div`
    width: 100%;
    max-width: 350px;
    display: flex;
    flex-flow: column;
    flex-shrink: 0;
    border-radius: 4px;
    padding: 2rem;
    box-sizing: border-box;
    text-align: center;
    box-shadow: 0 0.6rem 1rem rgba(36,37,38,0.08);
    background-color: #ffffff;
    color: #000000;
    
    ${StyledButton} {
      width: 100%;
      margin-top: 1rem;
    }
`
