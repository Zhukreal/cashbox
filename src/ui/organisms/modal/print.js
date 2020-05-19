import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { device } from 'lib/mediaDevice'
import { profileActions } from 'features/profile'
import { Button, StyledButton } from 'ui'
import closeGray from 'static/img/icons/close-gray.png'
import iconPrint from 'static/img/icons/print.png'

export const Print = ({
  title,
  data,
  onPrint,
  onClose,
  isLoadingReport,
  error,
  padding,
}) => {
  return (
    <Wrapper padding={padding}>
      <Header>
        <Title>{title}</Title>
        <Close onClick={onClose}>
          <img src={closeGray} alt="" />
        </Close>
      </Header>
      <Box>
        {isLoadingReport ? (
          <Loading>Загрузка...</Loading>
        ) : (
          <Report>
            {/*<iframe src="https://www.w3.org/TR/PNG/iso_8859-1.txt"></iframe>*/}
            <IFRAME
              src={`data:text/plain;charset=utf-8;base64,${data.receipt}`}
            ></IFRAME>

            {/*<PRE>*/}
            {/*    <CODE>{data.receipt}</CODE>*/}
            {/*</PRE>*/}

            {/*<img src={`data:image/jpeg;base64,${data.receipt}`} alt='receipt' />*/}
            {error && 'Не удалось загрузить'}
          </Report>
        )}
      </Box>
      {data.id && (
        <Footer>
          <Button onClick={onPrint} disabled={null} color={'green'}>
            <Icon src={iconPrint}></Icon>
            Напечатать
          </Button>
        </Footer>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-radius: 30px;
  width: 370px;
  padding: ${(p) => (p.padding ? '5%' : 0)} 
  
  @media ${device.mobile} {
    width: 100%;
    padding: ${(p) => (p.padding ? '120px 5% 5%' : 0)};
  }

  // @media ${device.desktop} {
  //   width: 650px;
  // }
`
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 5%;
  min-height: 100px;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`

const Footer = styled.div`
  text-align: center;
  margin-top: 5%;
`
const Close = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  box-shadow: var(--shadow-card);
  opacity: 0.6;
  cursor: pointer;

  img {
    width: 8px;
  }

  :hover {
    opacity: 0.8;
  }

  @media ${device.mobile} {
    display: none;
  }
`
const Report = styled.div``
const Loading = styled.div``
const Icon = styled.img`
  margin-right: 10px;
`

const shared = css`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
`
const PRE = styled.pre`
  ${shared}
`
const CODE = styled.code`
  ${shared}
`
const IFRAME = styled.iframe`
  height: 400px;
  border: none;
`
