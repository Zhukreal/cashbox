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

  // console.log('currentPayment', currentPayment)
  // console.log('currentReceipt', currentReceipt)

  // cR.receipt = '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'

  // ICAgICAgICAgINCX0JDQniDQotCj0KEKICBLcm9wb3RraW5hLCDQtC45MSDQvtGELjc3NwogICDQkdCY0J0v0JjQmNCdIDExMTExMTExMTExMTMKICDQndCU0KEg0YHQtdGA0LjRjzoyMjIzIOKEljo0NTY2NTQKLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQogINCa0LDRgdGB0LBf0Y/QvdC6ICB8ICAg0KHQvNC10L3QsCA3MQogINCf0L7RgNGP0LTQutC+0LLRi9C5INC90L7QvNC10YAg0YfQtdC60LAg4oSWMgogICAgICAgICAgICAgICAgINCf0LXRgtGA0L7QsiDQn9C10YLRgAogICAgICAgICAgICAgICAgICAgINCf0LXRgtGA0L7QstC40YcK0J/QoNCe0JTQkNCW0JAKLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQoKMS4g0KLQntCS0JDQoCDQoSDQndCU0KEgMjAlICAgICAgICAgIAogICAxLDAwMCB4IDM1MCwwMCAgICAgMzUwLDAwCiAgINCh0YLQvtC40LzQvtGB0YLRjCAgICAgICAgICAzNTAsMDAKCtCd0LDQu9C40YfQvdGL0LU6ICAgICAgICAgICAgIDM1MCwwMArQn9C+0LvRg9GH0LXQvdC90LDRjyDRgdGD0LzQvNCwOiAgICAgNTAwLDAwCtCh0YPQvNC80LAg0YHQtNCw0YfQuDogICAgICAgICAgMTUwLDAwCtCY0KLQntCT0J46ICAgICAgICAgICAgICAgIDM1MCwwMArQsiDRgi7Rhy4g0J3QlNChOiAgICAgICAgICAgIDU4LDMzCgotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCiAgICAgICDQpNC40YHQutCw0LvRjNC90YvQuSDRh9C10LoK0JDQniDQotCV0KHQojEK0KTQuNGB0LouINC/0YDQuNC30L3QsNC6IOKEliAxNjc3Mjk2NDYxOTAK0JLRgNC10LzRjzogMTkuMDUuMjAyMCAwMTo0Nzo1MAogICAgICAg0KDQndCcOiAwMDAwMjYxOAogICAgICDQl9Cd0Jw6IExLMDAwMDI2MTgKICoqKiDQodCf0JDQodCY0JHQniDQl9CQINCf0J7QmtCj0J/QmtCjICoqKg==

  useEffect(() => {}, [])

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

  const handlePrint = () => {}

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
          data={currentReceipt}
          onPrint={handlePrint}
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