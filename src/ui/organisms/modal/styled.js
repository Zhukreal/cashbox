import React from 'react'
import styled from "styled-components"
import {device} from 'lib/mediaDevice'
import {StyledButton} from 'ui'


export const Actions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8%;
    
    ${StyledButton} {
      height: 50px;
      width: 150px;
      margin: 0 10px;
      
      @media ${device.mobileTablet} { 
          height: 44px;
          font-size: 18px;
      }
    }
`