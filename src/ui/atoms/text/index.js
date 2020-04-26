import React from 'react'
import styled from "styled-components"

export const Text = ({ fz, mt, mb, children }) => {
    return (
        <StyledText fz={fz} mt={mt} mb={mb}>{children}</StyledText>
    )
}

export const StyledText = styled.p`
  font-size: ${p => p.fz ? p.fz + 'px' : 'inherit'};
  margin-top: ${p => p.mt ? p.mt + 'px' : 0};
  margin-bottom: ${p => p.mb ? p.mb + 'px' : 0};
`