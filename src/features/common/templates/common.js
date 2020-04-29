import * as React from "react"
import styled from "styled-components"
import { Header } from "../organisms"
import { Container } from "ui"

export const CommonContentTemplate = ({ children }) => (
  <>
      <Header />
      <ContentBox>
          <Container>
              {children}
          </Container>
      </ContentBox>
  </>
)

export const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  overflow-y: auto;
  min-height: calc(100vh - 120px);
  padding-top: 130px;
  padding-bottom: 2rem;
  color: var(--canvas-text);
  background-color: var(--canvas);
`
