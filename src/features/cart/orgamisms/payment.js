import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { device } from 'lib/mediaDevice'
import { modifyToNumber } from 'lib/modifyData/modifyToNumber'
import { useDetectDevice } from 'lib/customHooks/useDetectDevice'
import { cartActions, cartSelectors } from 'features/cart'
import { Input, Button, Textarea, FooterMobile, IconArrowLeft } from 'ui'
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
import closeGray from "static/img/icons/close-gray.png";

export const Payment = ({ onSuccess, onClose }) => {
  const items = [500, 1000, 2000, 5000, 10000, 20000]
  const [typePayment, setTypePayment] = useState('cash')
  const [activeCash, setActiveCash] = useState(null)
  const [enteredValue, setEnteredValue] = useState('')
  const [sumByCard, setSumByCard] = useState(0)
  const [sumByCash, setSumByCash] = useState(0)
  const [accepted, setAccepted] = useState(0)
  const [comment, setComment] = useState('')
  const [showedErrorCash, setShowedErrorCash] = useState(false)

  const dispatch = useDispatch()
  const { currency } = useSelector((state) => state.profile)
  const { isLoadingPayment } = useSelector((state) => state.cart)
  const products = useSelector((state) => cartSelectors.getProducts(state))
  const totalInfo = useSelector((state) => cartSelectors.getTotalInfo(state))

  const currentDevice = useDetectDevice()
  const isMobileView = currentDevice.isMobile || currentDevice.isTablet
  const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop

  useEffect(() => {
    setEnteredValue(totalInfo.total)
    if (typePayment === 'cash') {
      setSumByCard(0)
      setSumByCash(totalInfo.total)
    } else {
      setSumByCard(totalInfo.total)
      setSumByCash(0)
    }
  }, [typePayment])

  useEffect(() => {
    setActiveCash(null)
    if (typePayment === 'cash') {
      setSumByCash(enteredValue)
      setSumByCard(0)
    } else {
      setSumByCard(enteredValue)
      let cashRest = totalInfo.total - Number(enteredValue)
      setSumByCash(cashRest)
    }
  }, [enteredValue])



  // useEffect(() => {
  //   if (typePayment === 'cash') return
  //   let cashRest = totalInfo.total - sumByCard
  //   if (cashRest < 0) {
  //     setSumByCash(0)
  //   } else {
  //     setSumByCash(cashRest)
  //   }
  // }, [sumByCard])

  useEffect(() => {
    if (activeCash) {
      handlePayment(null,true)

      // if (activeCash > totalInfo.total) {
      //   handlePayment()
      //   setSumByCash(activeCash)
      //   setShowedErrorCash(false)
      // } else {
      //   setShowedErrorCash(true)
      // }
    }
  }, [activeCash])

  useEffect(() => {
    setAccepted(Number(sumByCash) + Number(sumByCard))
  }, [sumByCash, sumByCard])



  const onChangeEntered = (e) => {
    const { value } = e.target
    let numberView = modifyToNumber(value)
    if(typePayment === 'card') {
      if(Number(numberView) > totalInfo.total) numberView = totalInfo.total
    }
    setEnteredValue(numberView)
  }

  const onChangeComment = (e) => {
    const { value } = e.target
    setComment(value)
  }

  const handleSetActiveCash = (cash) => {
    setActiveCash(cash)
  }

  const handlePayment = async (e, isActiveCashPayment) => {
    if(!isActiveCashPayment) setActiveCash(null)
    const data = {
      ticketType: 'SELL',
      total: totalInfo.total,
      comment: comment,
      products: products,
      typePayment: typePayment,
    }

    if (typePayment === 'cash') {
      data.cash = isActiveCashPayment ? activeCash : enteredValue
      data.card = 0
      data.accepted = Number(data.cash)
    } else {
      data.accepted = accepted
      data.cash = sumByCash
      data.card = sumByCard
    }

    try {
      await dispatch(cartActions.pay(data))
      onSuccess()
    } catch (e) {}
  }

  return (
    <Wrapper>
      {isMobileView && (
        <HMobile>
          <IconArrowLeft onClick={onClose} />
        </HMobile>
      )}
      {isDesktopView && (
        <Close onClick={onClose}>
          <img src={closeGray} alt="" />
        </Close>
      )}
      {isLoadingPayment && (
        <Loading>
          <SpinnerBox>
            <Spinner />
          </SpinnerBox>
        </Loading>
      )}
      <Box>
        <BoxLeft>
          <Title>Прием оплаты</Title>
          <FlexBox>
            <Type
              onClick={() => setTypePayment('cash')}
              active={typePayment === 'cash'}
            >
              наличные
            </Type>
            <Type
              onClick={() => setTypePayment('card')}
              active={typePayment === 'card'}
            >
              карта
            </Type>
          </FlexBox>




          <Input
            type="text"
            value={enteredValue}
            onChange={onChangeEntered}
            placeholder="Сумма"
          />

          {isDesktopView && (
            <TextCenter>
              <Button onClick={handlePayment} color={'white'}>
                Принять
              </Button>
            </TextCenter>
          )}




          {/*{typePayment === 'card' && (*/}
          {/*  <>*/}
          {/*    <Input*/}
          {/*      type="text"*/}
          {/*      value={sumByCard}*/}
          {/*      onChange={onChangeSumByCard}*/}
          {/*      placeholder="Сумма"*/}
          {/*    />*/}

          {/*    {isDesktopView && (*/}
          {/*      <TextCenter>*/}
          {/*        <Button onClick={handlePayment} color={'white'}>*/}
          {/*          Принять*/}
          {/*        </Button>*/}
          {/*      </TextCenter>*/}
          {/*    )}*/}

          {/*    {isMobileView && (*/}
          {/*      <FooterMobile*/}
          {/*        title={'Принять'}*/}
          {/*        onOk={handlePayment}*/}
          {/*        disabled={null}*/}
          {/*        isLoading={isLoadingPayment}*/}
          {/*      />*/}
          {/*    )}*/}
          {/*  </>*/}
          {/*)}*/}

          {typePayment === 'cash' && (
            <>
              <Subtitle>Варианты оплаты наличными:</Subtitle>
              <List>
                {items.map((item) => (
                  <Item
                    key={item}
                    onClick={() => handleSetActiveCash(item)}
                    active={item === activeCash}
                  >
                    {item}
                  </Item>
                ))}
              </List>
              {showedErrorCash && (
                <ErrorCash>
                  Сумма должны быть больше или равной итоговой
                </ErrorCash>
              )}
            </>
          )}

          {isMobileView && (
            <FooterMobile
              title={'Принять'}
              onOk={handlePayment}
              disabled={null}
              isLoading={isLoadingPayment}
            />
          )}


        </BoxLeft>
        <BoxRight>
          <Title>Платежи</Title>
          <Block>
            <BlockTitle>Итого:</BlockTitle>
            <BlockValue>
              {totalInfo.total} {currency}
            </BlockValue>
          </Block>
          <Block>
            <BlockTitle>Принято:</BlockTitle>
            <BlockValue>
              {accepted ? `${accepted} ${currency}` : '-'}
            </BlockValue>
          </Block>
          <Divider />

          <Block>
            <TextSub>Наличные:</TextSub>
            <TextSub>{sumByCash ? `${sumByCash} ${currency}` : '-'} </TextSub>
          </Block>
          <Block>
            <TextSub>Банковская карта:</TextSub>
            <TextSub>{sumByCard ? `${sumByCard} ${currency}` : '-'}</TextSub>
          </Block>

          <Textarea
            value={comment}
            onChange={onChangeComment}
            placeholder="Комментарий"
          />
        </BoxRight>
      </Box>
    </Wrapper>
  )
}

const ErrorCash = styled.div`
  color: var(--red);
  font-size: 14px;
  margin-top: 10px;
`

const Close = styled.div`
  position: absolute;
  right: 5%;
  top: 5%;  
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
`
