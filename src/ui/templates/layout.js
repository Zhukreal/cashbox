import styled, { css } from "styled-components"

export const Container = styled.div`
  max-width: 120rem;
  width: 100%;
  display: inherit;
  flex: inherit;
  flex-flow: inherit;
  flex-direction: column;

  @media screen and (max-width: 120rem) {
    padding: 0 1rem;
  }
`

const is = (value) => typeof value !== "undefined"
const prop = (value) => (is(value) ? value : "initial")
export const mixins = (props) => css`
  align-content: ${prop(props.alignContent)};
  align-items: ${prop(props.align)};
  flex-basis: ${prop(props.basis)};
  flex-grow: ${prop(props.grow)};
  flex-shrink: ${prop(props.shrink)};
  justify-content: ${prop(props.justify)};
  order: ${prop(props.order)};
  padding: ${prop(props.padding)};
  width: ${prop(props.width)};
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  ${mixins};
  width: 100%;

  ${(p) =>
    p.gap &&
    css`
      & > :not(:first-child) {
        margin-left: ${p.gap};
      }
    `}
`

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  ${mixins}

  ${(p) =>
    p.gap &&
    css`
      & > :not(:first-child) {
        margin-top: ${p.gap};
      }
    `}
`