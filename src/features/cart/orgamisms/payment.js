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

export const Payment = ({ onSuccess, onClose }) => {
  const items = [500, 1000, 2000, 5000, 10000, 20000]
  const [typePayment, setTypePayment] = useState('cash')
  const [activeCash, setActiveCash] = useState(null)
  const [sumByCard, setSumByCard] = useState('')
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
    if (typePayment === 'cash') return
    let cashRest = totalInfo.total - sumByCard
    if (cashRest < 0) {
      setSumByCash(0)
    } else {
      setSumByCash(cashRest)
    }
  }, [sumByCard])

  useEffect(() => {
    if (activeCash) {
      if (activeCash > totalInfo.total) {
        handlePayment()
        setSumByCash(activeCash)
        setShowedErrorCash(false)
      } else {
        setShowedErrorCash(true)
      }
    }
  }, [activeCash])

  useEffect(() => {
    setAccepted(Number(sumByCash) + Number(sumByCard))
  }, [sumByCash, sumByCard])

  useEffect(() => {
    if (typePayment === 'card') {
      setSumByCard(totalInfo.total)
      setActiveCash(null)
      setSumByCash(0)
    } else {
      setSumByCard('')
    }
  }, [typePayment])

  const onChangeSumByCard = (e) => {
    const { value } = e.target
    let numberView = modifyToNumber(value)
    setSumByCard(numberView)
  }

  const onChangeComment = (e) => {
    const { value } = e.target
    setComment(value)
  }

  const handleSetActiveCash = (cash) => {
    setActiveCash(cash)
  }

  const handlePayment = async () => {
    const data = {
      ticketType: 'SELL',
      total: totalInfo.total,
      comment: comment,
      products: products,
      typePayment: typePayment,
    }

    if (typePayment === 'cash') {
      data.cash = activeCash
      data.card = 0
      data.accepted = Number(activeCash)
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

          {typePayment === 'card' && (
            <>
              <Input
                type="text"
                value={sumByCard}
                onChange={onChangeSumByCard}
                placeholder="Сумма"
              />

              {isDesktopView && (
                <TextCenter>
                  <Button onClick={handlePayment} color={'white'}>
                    Принять
                  </Button>
                </TextCenter>
              )}

              {isMobileView && (
                <FooterMobile
                  title={'Принять'}
                  onOk={handlePayment}
                  disabled={null}
                  isLoading={isLoadingPayment}
                />
              )}
            </>
          )}

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
