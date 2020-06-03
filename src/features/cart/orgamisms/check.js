import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Base64 } from 'js-base64';
import { mathRound2 } from 'lib/math'
import { device } from 'lib/mediaDevice'
import { useDetectDevice } from 'lib/customHooks/useDetectDevice'
import { emailValidator } from 'lib/validators'
import { cartActions, cartSelectors } from 'features/cart'
import {
  Input,
  Button,
  IconArrowLeft,
  StyledInput,
  StyledInputMask,
  FooterMobile,
  Print,
} from 'ui'
import IconMail from 'static/img/icons/mail.png'
import IconWatsApp from 'static/img/icons/whatsapp.png'
import {
  Wrapper,
  Box,
  BoxLeft,
  BoxRight,
  Title,
  FlexBox,
  Type,
  TextCenter,
  Subtitle,
  List,
  Item,
  Block,
  BlockTitle,
  BlockValue,
  Divider,
  TextSub,
  Icon,
  Loading,
  SpinnerBox,
  Spinner,
  HMobile,
} from './styled'


// function b64DecodeUnicode(str) {
//   try{
//     return decodeURIComponent(
//       atob(str)
//         .split('')
//         .map(function (c) {
//           return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
//         })
//         .join(''),
//     )
//   } catch (e) {
//
//   }
// }

function b64DecodeUnicode(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}

const initial = {
  name: '',
  phone: '',
  email: '',
}

export const Check = ({ onClose, editable = {} }) => {
  const [user, setUser] = useState(initial)
  const [showedReceipt, setShowedReceipt] = useState(false)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPhone, setErrorPhone] = useState(null)
  const [isLoadingTicketEmail, setIsLoadingTicketEmail] = useState(false)
  const [isLoadingTicketWhatsApp, setIsLoadingTicketWhatsApp] = useState(false)
  const [linkWhatsApp, setLinkWhatsApp] = useState(null)

  const dispatch = useDispatch()
  const { currency } = useSelector((state) => state.profile)
  const { currentPayment, currentReceipt } = useSelector((state) => state.cart)
  const { client } = useSelector((state) => state.user)

  const changeCheck = mathRound2(currentPayment.accepted - currentPayment.total)

  const currentDevice = useDetectDevice()
  const isMobileView = currentDevice.isMobile || currentDevice.isTablet
  const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop


  useEffect(() => {
    if (user.email) {
      const error = emailValidator(user.email)
      setErrorEmail(error)
    } else {
      setErrorEmail(null)
    }
  }, [user.email])

  useEffect(() => {
    if (user.phone) {
      const phoneNumbers = user.phone.replace(/\D/g, '')
      if (phoneNumbers.length === 11) {
        setErrorPhone(false)
      } else {
        setErrorPhone(true)
      }
    }
  }, [user.phone])

  const onChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handlePrintCheck = () => {
    const data = client.id ? client : user
    setShowedReceipt(true)
  }

  const handleSendTicketEmail = async () => {
    const email = client.email || user.email
    if (!email || errorEmail) {
      setErrorEmail(true)
      return
    }
    if (isLoadingTicketEmail) return
    try {
      setIsLoadingTicketEmail(true)
      await dispatch(cartActions.sendTicketEmail(currentReceipt.id, email))
    } catch (e) {
    } finally {
      setIsLoadingTicketEmail(false)
    }
  }

  const handleSendTicketWhatsApp = async () => {
    const phone = client.phone || user.phone
    if (!phone || errorPhone) {
      setErrorPhone(true)
      return
    }
    setIsLoadingTicketWhatsApp(true)

    const phoneNumbers = phone.replace(/\D/g, '')
    const text = Base64.decode(currentReceipt.receipt)
    const msg = window.encodeURIComponent(text)
    window.open(`https://wa.me/${phoneNumbers}?text=${msg}`, '_blank')
    setIsLoadingTicketWhatsApp(false)

    // if (isLoadingTicketWhatsApp) return
    // try {
    //   setIsLoadingTicketWhatsApp(true)
    //   await dispatch(cartActions.sendTicketWhatsApp(currentReceipt.id))
    // } catch (e) {
    //   setIsLoadingTicketWhatsApp(false)
    // }
  }



  if (showedReceipt)
    return (
      <Wrapper isReceipt>
        {isMobileView && (
          <HMobile>
            <IconArrowLeft onClick={onClose} />
          </HMobile>
        )}
        <Print
          title={'Чек'}
          data={currentReceipt.receipt}
          qr={currentReceipt.ofd_qr}
          onClose={onClose}
          isLoadingReport={false}
          error={null}
          padding
        />
      </Wrapper>
    )


  return (
    <Wrapper>
      {isMobileView && (
        <HMobile>
          <IconArrowLeft onClick={onClose} />
        </HMobile>
      )}
      <Box isView2>
        <BoxLeft isView2>
          <Title>Клиент</Title>

          {client.id ? (
            <ClientInfo>
              <ClientName>{client.name}</ClientName>
              <ClientPhone>{client.phone}</ClientPhone>
              <ClientPhone>{client.email}</ClientPhone>
            </ClientInfo>
          ) : (
            <WrapInputs>
              <Input
                name="name"
                value={user.name}
                onChange={onChange}
                placeholder="ФИО"
                isUnderline={isDesktopView}
                isForm={isMobileView}
              />
              <Input
                type="tel"
                label="Введите номер телефона:"
                name="phone"
                value={user.phone}
                onChange={onChange}
                placeholder="+7(___)___-__-__"
                error={errorPhone && 'Введите корректный номер телефона'}
                isInputMask
                mask="+7 (999) 999-99-99"
                alwaysShowMask
                isForm={isMobileView}
              />
              {/*<Input*/}
              {/*  type={'tel'}*/}
              {/*  name="phone"*/}
              {/*  value={user.phone}*/}
              {/*  onChange={onChange}*/}
              {/*  placeholder="Номер телефона"*/}
              {/*  error={errorPhone && 'Введите корректный номер телефона'}*/}
              {/*  isUnderline={isDesktopView}*/}
              {/*  isForm={isMobileView}*/}
              {/*/>*/}
              <Input
                name="email"
                type="email"
                value={user.email}
                onChange={onChange}
                placeholder="E-mail"
                error={errorEmail && 'Введите корректный e-mail'}
                isUnderline={isDesktopView}
                isForm={isMobileView}
              />
            </WrapInputs>
          )}

          <Subtitle isView2>Отправить: </Subtitle>

          <TempWrap>
            <Icon
              onClick={handleSendTicketEmail}
              isLoading={isLoadingTicketEmail}
            >
              <img src={IconMail} alt="" />
            </Icon>
            <Icon
              green
              onClick={handleSendTicketWhatsApp}
              isLoading={isLoadingTicketWhatsApp}
            >
              <img src={IconWatsApp} alt="" />
            </Icon>
          </TempWrap>

          {isMobileView && (
            <FooterMobile
              title={'Печать чека'}
              onOk={handlePrintCheck}
              disabled={null}
              // isLoading={isLoadingPayment}
            />
          )}
        </BoxLeft>
        <BoxRight>
          <Title>Платежи</Title>
          <Block>
            <BlockTitle>Итого:</BlockTitle>
            <BlockValue>
              {currentPayment.total} {currency}
            </BlockValue>
          </Block>
          <Block>
            <BlockTitle>Принято:</BlockTitle>
            <BlockValue>
              {currentPayment.accepted
                ? `${currentPayment.accepted} ${currency}`
                : '-'}
            </BlockValue>
          </Block>
          <Divider />
          <Block>
            <TextSub>Наличные:</TextSub>
            <TextSub>
              {currentPayment.cash ? `${currentPayment.cash} ${currency}` : '-'}{' '}
            </TextSub>
          </Block>
          <Block>
            <TextSub>Банковская карта:</TextSub>
            <TextSub>
              {currentPayment.card ? `${currentPayment.card} ${currency}` : '-'}{' '}
            </TextSub>
          </Block>
          <Divider />
          <Block>
            <BlockTitle>Сдача:</BlockTitle>
            <BlockValue>
              {changeCheck} {currency}
            </BlockValue>
          </Block>

          {isDesktopView && (
            <FlexBox isView2>
              <Button color="red" onClick={onClose}>
                Закрыть
              </Button>
              <Button onClick={handlePrintCheck} color="green">
                Печать чека
              </Button>
            </FlexBox>
          )}
        </BoxRight>
      </Box>
    </Wrapper>
  )
}

const ClientInfo = styled.div`
  height: 165px;
`
const ClientName = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`
const ClientPhone = styled.div`
  font-size: 16px;
  color: #444444;
  margin-bottom: 10px;
`
const WrapInputs = styled.div`
  ${StyledInputMask} {
    border-radius: 0;
    border: none;
    border-bottom: 1px solid var(--canvas-text);
    padding-left: 0;
    padding-top: 10px;
    box-shadow: none;
    font-size: 20px;
  }
  @media ${device.laptop} {
    ${StyledInputMask} {
      font-size: 18px;
      height: 44px;
    }
  }

  @media ${device.mobileTablet} {
    ${StyledInput}, ${StyledInputMask} {
      height: 40px;
      border-radius: 20px;
      padding: 0 20px !important;
      font-size: 16px;
      border: none;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
    }
  }
`

const TempWrap = styled.div`
  @media ${device.mobileTablet} {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
`

// %20%20%20%20%20%20%20%20%20%20%d0%97%d0%90%d0%9e%20%d0%a2%d0%a3%d0%a1%20%20Kropotkina%2c%20%d0%b4.91%20%d0%be%d1%84.777%20%20%20%d0%91%d0%98%d0%9d%2f%d0%98%d0%98%d0%9d%201111111111113%20%20%d0%9d%d0%94%d0%a1%20%d1%81%d0%b5%d1%80%d0%b8%d1%8f%3a2223%20%e2%84%96%3a456654----------------------------%20%20%d0%9a%d0%b0%d1%81%d1%81%d0%b0_%d1%8f%d0%bd%d0%ba%20%20%7c%20%20%20%d0%a1%d0%bc%d0%b5%d0%bd%d0%b0%2071%20%20%d0%9f%d0%be%d1%80%d1%8f%d0%b4%d0%ba%d0%be%d0%b2%d1%8b%d0%b9%20%d0%bd%d0%be%d0%bc%d0%b5%d1%80%20%d1%87%d0%b5%d0%ba%d0%b0%20%e2%84%963%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%d0%9f%d0%b5%d1%82%d1%80%d0%be%d0%b2%20%d0%9f%d0%b5%d1%82%d1%80%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%d0%9f%d0%b5%d1%82%d1%80%d0%be%d0%b2%d0%b8%d1%87%d0%9f%d0%a0%d0%9e%d0%94%d0%90%d0%96%d0%90----------------------------1.%20salt%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201%2c000%20x%20300%2c00%20%20%20%20%20300%2c00%20%20%20%d0%a1%d1%82%d0%be%d0%b8%d0%bc%d0%be%d1%81%d1%82%d1%8c%20%20%20%20%20%20%20%20%20%20300%2c00%d0%9d%d0%b0%d0%bb%d0%b8%d1%87%d0%bd%d1%8b%d0%b5%3a%20%20%20%20%20%20%20%20%20%20%20%20%20300%2c00%d0%9f%d0%be%d0%bb%d1%83%d1%87%d0%b5%d0%bd%d0%bd%d0%b0%d1%8f%20%d1%81%d1%83%d0%bc%d0%bc%d0%b0%3a%20%20%20%20%20500%2c00%d0%a1%d1%83%d0%bc%d0%bc%d0%b0%20%d1%81%d0%b4%d0%b0%d1%87%d0%b8%3a%20%20%20%20%20%20%20%20%20%20200%2c00%d0%98%d0%a2%d0%9e%d0%93%d0%9e%3a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20300%2c00%d0%b2%20%d1%82.%d1%87.%20%d0%9d%d0%94%d0%a1%3a%20%20%20%20%20%20%20%20%20%20%20%2032%2c14----------------------------%20%20%20%20%20%20%20%d0%a4%d0%b8%d1%81%d0%ba%d0%b0%d0%bb%d1%8c%d0%bd%d1%8b%d0%b9%20%d1%87%d0%b5%d0%ba%d0%90%d0%9e%20%d0%a2%d0%95%d0%a1%d0%a21%d0%a4%d0%b8%d1%81%d0%ba.%20%d0%bf%d1%80%d0%b8%d0%b7%d0%bd%d0%b0%d0%ba%20%e2%84%96%20674568457017%d0%92%d1%80%d0%b5%d0%bc%d1%8f%3a%2019.05.2020%2013%3a34%3a45%20%20%20%20%20%20%20%d0%a0%d0%9d%d0%9c%3a%2000002618%20%20%20%20%20%20%d0%97%d0%9d%d0%9c%3a%20LK00002618%20%2a%2a%2a%20%d0%a1%d0%9f%d0%90%d0%a1%d0%98%d0%91%d0%9e%20%d0%97%d0%90%20%d0%9f%d0%9e%d0%9a%d0%a3%d0%9f%d0%9a%d0%a3%20%2a%2a%2a&source=&data=&app_absent=
// %20%20%20%20%20%20%20%20%20%20%d0%97%d0%90%d0%9e%20%d0%a2%d0%a3%d0%a1%0a%20%20Kropotkina%2c%20%d0%b4.91%20%d0%be%d1%84.777%0a%20%20%20%d0%91%d0%98%d0%9d%2f%d0%98%d0%98%d0%9d%201111111111113%0a%20%20%d0%9d%d0%94%d0%a1%20%d1%81%d0%b5%d1%80%d0%b8%d1%8f%3a2223%20%e2%84%96%3a456654%0a----------------------------%0a%d1%82%d1%80%d0%b0%d0%bd%d1%81%d1%82%d0%b5%d0%bb%d0%b5%d0%ba%d0%be%d0%bc%20%7c%20%20%20%d0%a1%d0%bc%d0%b5%d0%bd%d0%b0%2012%0a%20%20%d0%9f%d0%be%d1%80%d1%8f%d0%b4%d0%ba%d0%be%d0%b2%d1%8b%d0%b9%20%d0%bd%d0%be%d0%bc%d0%b5%d1%80%20%d1%87%d0%b5%d0%ba%d0%b0%20%e2%84%961%0a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%d0%91%d0%be%d1%81%d1%8e%d0%ba%20%d0%9e%d0%bb%d0%b5%d0%b3%0a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%d0%9b%d0%b5%d0%be%d0%bd%d0%b8%d0%b4%d0%be%d0%b2%d0%b8%d1%87%0a%d0%9f%d0%a0%d0%9e%d0%94%d0%90%d0%96%d0%90%0a----------------------------%0a%0a1.%20%d1%81%d1%83%d0%bf%d0%b5%d1%80%d1%82%d0%be%d0%b2%d0%b0%d1%80%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0a%20%20%202%2c000%20x%2020%2c00%20%20%20%20%20%20%2040%2c00%0a%20%20%20%d0%a1%d1%82%d0%be%d0%b8%d0%bc%d0%be%d1%81%d1%82%d1%8c%20%20%20%20%20%20%20%20%20%20%2040%2c00%0a%0a%d0%9d%d0%b0%d0%bb%d0%b8%d1%87%d0%bd%d1%8b%d0%b5%3a%20%20%20%20%20%20%20%20%20%20%20%20%20%2040%2c00%0a%d0%9f%d0%be%d0%bb%d1%83%d1%87%d0%b5%d0%bd%d0%bd%d0%b0%d1%8f%20%d1%81%d1%83%d0%bc%d0%bc%d0%b0%3a%20%20%20%20%20%2040%2c00%0a%d0%a1%d1%83%d0%bc%d0%bc%d0%b0%20%d1%81%d0%b4%d0%b0%d1%87%d0%b8%3a%20%20%20%20%20%20%20%20%20%20%20%200%2c00%0a%d0%98%d0%a2%d0%9e%d0%93%d0%9e%3a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2040%2c00%0a%d0%b2%20%d1%82.%d1%87.%20%d0%9d%d0%94%d0%a1%3a%20%20%20%20%20%20%20%20%20%20%20%20%204%2c29%0a%0a----------------------------%0a%20%20%20%20%20%20%20%d0%a4%d0%b8%d1%81%d0%ba%d0%b0%d0%bb%d1%8c%d0%bd%d1%8b%d0%b9%20%d1%87%d0%b5%d0%ba%0a%d0%90%d0%9e%20%d0%a2%d0%95%d0%a1%d0%a21%0a%d0%a4%d0%b8%d1%81%d0%ba.%20%d0%bf%d1%80%d0%b8%d0%b7%d0%bd%d0%b0%d0%ba%20%e2%84%96%0a1017049943378%0a%d0%92%d1%80%d0%b5%d0%bc%d1%8f%3a%2025.05.2020%2016%3a00%3a29%0a%20%20%20%20%20%20%20%d0%a0%d0%9d%d0%9c%3a%2000002776%0a%20%20%20%20%20%20%d0%97%d0%9d%d0%9c%3a%20LK00002776%0a%20%2a%2a%2a%20%d0%a1%d0%9f%d0%90%d0%a1%d0%98%d0%91%d0%9e%20%d0%97%d0%90%20%d0%9f%d0%9e%d0%9a%d0%a3%d0%9f%d0%9a%d0%a3%20%2a%2a%2a%0a%d0%9f%d1%80%d0%be%d0%b2%d0%b5%d1%80%d0%b8%d1%82%d1%8c%20%d1%87%d0%b5%d0%ba%20%d0%bd%d0%b0%20%d1%81%d0%b0%d0%b9%d1%82%d0%b5%20%d0%9e%d0%a4%d0%94%3a%2087.255.215.94%2ft%2f%3fi%3d1017049943378%26f%3d00002776%26s%3d40.0%26t%3d20200525T160000&source=&data=&app_absent=