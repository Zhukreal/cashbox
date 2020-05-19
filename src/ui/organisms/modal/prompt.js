import React from 'react'
import styled from 'styled-components'
import { device } from 'lib/mediaDevice'
import { Button, Input, BoxInput, StyledInput } from 'ui'
import { Actions } from './styled'

export const Prompt = ({
  title,
  cash,
  onOk,
  onCancel,
  cancelText,
  okText,
  value,
  onChange,
  isLoading,
}) => {
  return (
    <Box>
      <Header>
        <Title>{title}</Title>
        <Title>{cash}</Title>
      </Header>
      <WrapInput>
        <Input value={value} onChange={onChange} placeholder="Укажите сумму" />
      </WrapInput>
      <Actions>
        <Button onClick={onCancel} color={'red'} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button onClick={onOk} color={'green'} isLoading={isLoading}>
          {okText}
        </Button>
      </Actions>
    </Box>
  )
}

const Box = styled.div`
  width: 500px;

  @media ${device.laptop} {
    width: 450px;
  }
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
`
const WrapInput = styled.div`
  margin-top: 30px;

  ${BoxInput} {
    margin: 0;
  }
`
