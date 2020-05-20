import React from 'react'
import styled from 'styled-components'
import { device } from 'lib/mediaDevice'
import { useDetectDevice } from "lib/customHooks/useDetectDevice";
import { Button, Input, BoxInput, StyledInput, FooterMobile } from "ui";
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
  const currentDevice = useDetectDevice()
  const isMobileView = currentDevice.isMobile || currentDevice.isTablet
  const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop

  return (
    <Box>
      <Header>
        <Title>{title}</Title>
        <Title>{cash}</Title>
      </Header>
      <WrapInput>
        <Input value={value} onChange={onChange} placeholder="Укажите сумму" />
      </WrapInput>

      {isMobileView && (
        <FooterMobile
          title={okText}
          onOk={onOk}
          isLoading={isLoading}
        />
      )}

      {isDesktopView && (
        <Actions>
          <Button onClick={onCancel} color={'red'} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button onClick={onOk} color={'green'} isLoading={isLoading}>
            {okText}
          </Button>
        </Actions>
      )}





    </Box>
  )
}

const Box = styled.div`
  width: 500px;

  @media ${device.laptop} {
    width: 450px;
  }
  @media ${device.mobileTablet} {
    width: 100%;
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
  
  @media ${device.mobileTablet} {
   font-size: 16px;
  }
`
const WrapInput = styled.div`
  margin-top: 30px;

  ${BoxInput} {
    margin: 0;
  }
`
