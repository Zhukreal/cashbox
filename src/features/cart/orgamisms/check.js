import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import styled from "styled-components";
import {mathRound2} from "lib/math";
import {device} from "lib/mediaDevice";
import {emailValidator} from "lib/validators";
import {cartActions, cartSelectors} from "features/cart"
import {Input, Button, IconArrowLeft, StyledInput, FooterMobile} from "ui"
import IconMail from 'static/img/icons/mail.png'
import IconWatsApp from 'static/img/icons/whatsapp.png'
import {Wrapper, Box, BoxLeft, BoxRight, Title, FlexBox, Type, TextCenter, Subtitle, List, Item, Block, BlockTitle, BlockValue, Divider, TextSub, Icon, Loading, SpinnerBox, Spinner, HMobile} from './styled'
import {useDetectDevice} from "../../../lib/customHooks/useDetectDevice";


const initial = {
    name: '',
    phone: '',
    email: ''
}

export const Check = ({onClose, editable = {}}) => {
    const [user, setUser] = useState(initial)
    const [errorEmail, setErrorEmail] = useState(null)
    const [isLoadingTicketEmail, setIsLoadingTicketEmail] = useState(false)
    const [isLoadingTicketWhatsApp, setIsLoadingTicketWhatsApp] = useState(false)

    const dispatch = useDispatch()
    const { currency } = useSelector(state => state.profile)
    const { currentPayment } = useSelector(state => state.cart)
    const { client } = useSelector(state => state.user)

    const changeCheck = mathRound2(currentPayment.accepted - currentPayment.total)

    const currentDevice = useDetectDevice()
    const isMobileView = currentDevice.isMobile || currentDevice.isTablet
    const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop

    // console.log('currentPayment', currentPayment)


    useEffect(() => {

    })


    useEffect(() => {
        if(user.email) {
            const error = emailValidator(user.email)
            setErrorEmail(error)
        } else {
            setErrorEmail(null)
        }
    }, [user.email])

    const onChange = e => {
        const {name, value} = e.target

        setUser({...user, [name]: value})
    }

    const handlePrintCheck = () => {
        const data = client.id ? client : user
        console.log(data)
    }

    const handleSendTicketEmail = async () => {
        if(isLoadingTicketEmail) return
        try {
            setIsLoadingTicketEmail(true)
            await dispatch(cartActions.sendTicketEmail())
        } catch (e) {
            setIsLoadingTicketEmail(false)
        }
    }

    const handleSendTicketWhatsApp = async () => {
        if(isLoadingTicketWhatsApp) return
        try {
            setIsLoadingTicketWhatsApp(true)
            await dispatch(cartActions.sendTicketWhatsApp())
        } catch (e) {
            setIsLoadingTicketWhatsApp(false)
        }
    }


    return (
        <Wrapper>
            {isMobileView &&
            <HMobile>
                <IconArrowLeft onClick={onClose}  />
            </HMobile>
            }
            <Box isView2 >
                <BoxLeft isView2>
                    <Title>Клиент</Title>

                    {client.id ?
                    <ClientInfo>
                        <ClientName>{client.name}</ClientName>
                        <ClientPhone>{client.phone}</ClientPhone>
                        <ClientPhone>{client.email}</ClientPhone>
                    </ClientInfo>
                    :
                    <WrapInputs>
                        <Input
                            name='name'
                            value={user.name}
                            onChange={onChange}
                            placeholder='ФИО'
                            isUnderline={isDesktopView}
                            isForm={isMobileView}
                        />
                        <Input
                            type={'tel'}
                            name='phone'
                            value={user.phone}
                            onChange={onChange}
                            placeholder='Номер телефона'
                            isUnderline={isDesktopView}
                            isForm={isMobileView}
                        />
                        <Input
                            name='email'
                            value={user.email}
                            onChange={onChange}
                            placeholder='E-mail'
                            error={errorEmail && 'Введите корректный e-mail'}
                            isUnderline={isDesktopView}
                            isForm={isMobileView}
                        />
                    </WrapInputs>
                    }


                    <Subtitle isView2>Отправить: </Subtitle>

                    <TempWrap>
                        <Icon
                            onClick={handleSendTicketEmail}
                            isLoading={isLoadingTicketEmail}
                        >
                            <img src={IconMail}  alt=""/>
                        </Icon>
                        <Icon
                            green
                            onClick={handleSendTicketWhatsApp}
                            isLoading={isLoadingTicketWhatsApp}
                        >
                            <img src={IconWatsApp}  alt=""/>
                        </Icon>
                    </TempWrap>

                    {isMobileView &&
                    <FooterMobile
                        title={'Печать чека'}
                        onOk={handlePrintCheck}
                        disabled={null}
                        // isLoading={isLoadingPayment}
                    />
                    }
                </BoxLeft>
                <BoxRight>
                    <Title>Платежи</Title>
                    <Block>
                        <BlockTitle>Итого:</BlockTitle>
                        <BlockValue>{currentPayment.total} {currency}</BlockValue>
                    </Block>
                    <Block>
                        <BlockTitle>Принято:</BlockTitle>
                        <BlockValue>{currentPayment.accepted ? `${currentPayment.accepted} ${currency}` : '-' }</BlockValue>
                    </Block>
                    <Divider/>
                    <Block>
                        <TextSub>Наличные:</TextSub>
                        <TextSub>{currentPayment.cash ? `${currentPayment.cash} ${currency}` : '-' } </TextSub>
                    </Block>
                    <Block>
                        <TextSub>Банковская карта:</TextSub>
                        <TextSub>{currentPayment.card ? `${currentPayment.card} ${currency}` : '-' } </TextSub>
                    </Block>
                    <Divider/>
                    <Block>
                        <BlockTitle>Сдача:</BlockTitle>
                        <BlockValue>{changeCheck} {currency}</BlockValue>
                    </Block>

                    {isDesktopView &&
                    <FlexBox isView2>
                        <Button
                            color='red'
                            onClick={onClose}
                        >
                            Закрыть
                        </Button>
                        <Button
                            onClick={handlePrintCheck}
                            color='green'
                        >
                            Печать чека
                        </Button>
                    </FlexBox>
                    }

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
  @media ${device.mobileTablet} {
      
      
      ${StyledInput} {
        height: 40px;
        border-radius: 20px;
        padding: 0 20px!important;
        font-size: 16px;
        border: none;
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