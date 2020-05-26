import React, { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { Base64 } from 'js-base64'
import  QRCode from 'qrcode.react'
import { useReactToPrint } from 'react-to-print'
import { useDispatch, useSelector } from 'react-redux'
import { device } from 'lib/mediaDevice'
import { profileActions } from 'features/profile'
import { Button, StyledButton } from 'ui'
import closeGray from 'static/img/icons/close-gray.png'
import iconPrint from 'static/img/icons/print.png'

export const Print = ({
  title,
  data,
  qr,
  onClose,
  isLoadingReport,
  error,
  padding,
}) => {
  const [decodedStr, setDecodedStr] = useState(null)
  const [decodedQr, setDecodedQr] = useState(null)
  const componentRef = useRef(null)

  useEffect(() => {
    try {
      const text = Base64.decode(data)
      setDecodedStr(text)
    } catch (e) {}
  }, [data])

  useEffect(() => {
    try {
      const text = Base64.decode(qr)
      console.log('qr', text)
      setDecodedQr(text)
    } catch (e) {}
  }, [qr])

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: '',
    onAfterPrint: () => onClose(),
  })

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
            <PRE ref={componentRef}>
              <CODE>{decodedStr}</CODE>

              {decodedQr &&
              <WrapQr>
                <QRCode value={decodedQr}/>
              </WrapQr>
              }
            </PRE>
            {error && 'Не удалось загрузить'}
          </Report>
        )}
      </Box>
      {decodedStr && (
        <Footer>
          <Button onClick={handlePrint} disabled={null} color={'green'}>
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

  ${StyledButton} {
    padding: 0 50px;
  }

  @media ${device.laptop}, ${device.mobileTablet} {
    ${StyledButton} {
      padding: 0 30px;
    }
  }
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
    //display: none;
  }
`
const Report = styled.div`
  width: 100%;
  max-height: 50vh;
  overflow-y: auto;
  text-align: center;

  @media ${device.laptop} {
    height: 50vh;
  }
  @media ${device.mobileTablet} {
    height: calc(100vh - 300px);
  }
`
const Loading = styled.div``
const Icon = styled.img`
  margin-right: 10px;
`

const shared = css`
  width: 100%;
  max-width: 100%;
  //overflow: hidden;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
`
const PRE = styled.pre`
  ${shared};
`
const CODE = styled.code`
  ${shared}
`
const IFRAME = styled.iframe`
  height: 400px;
  border: none;
`
const WrapQr = styled.div`
  margin-top: 20px;
  //text-align: center;
  
  canvas{
    width: 80px!important;
    height: 80px!important;
  }
`
