import styled, { css } from "styled-components"
import { device } from 'lib/mediaDevice';

export const Container = styled.div`
  //max-width: 120rem;
  width: 100%;
  display: inherit;
  flex: inherit;
  flex-flow: inherit;
  flex-direction: column;
  padding: 0 3%;
  
  @media ${device.laptop} { 
       padding: 0 2%;
    }
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
// ${({xs}) => (xs ? getWidthString(xs) : "width: 100%")}
export const Col = styled.div`
  display: flex;
  width: 25%;
`

const getWidthString = (span) => {
  if(!span) return;
  let width = span / 12 * 100
  return `width: ${width}%;`
}