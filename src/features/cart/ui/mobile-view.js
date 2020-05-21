import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'lib/customHooks/useDebounce'
import { AddUser, userActions, UsersList } from 'features/user'
import { Button, Input, Modal, StyledButton } from 'ui'
import { List } from './list'
import iconCloseCart from 'static/img/icons/close-cart-mob.svg'
import iconAcceptCart from 'static/img/icons/accept-cart-mob.svg'
import {
  CartBtnBox,
  CartTotalRow,
  CartTotalRowDivider,
  CartTotalRowTitle,
  CartTotalRowValuer,
} from './styled'
import { IconArrowLeft, IconClearClient } from 'ui'

export const MobileView = ({
  isShowedMobileCart,
  setShowedMobileCart,
  client,
  searchU,
  onChangeSearchUsers,
  products,
  editable,
  currency,
  totalInfo,
  handleEdit,
  handleRemoveProduct,
  handleAddOne,
  handleRemoveOne,
  handleClearCart,
  handleOpenModalPayment,
  handleClearClient,
}) => {
  const isSmallTotalShowed = !!(products.length && !isShowedMobileCart)
  const isFullShowed = !!(products.length && isShowedMobileCart)

  return (
    <>
      {isFullShowed && (
        <MobileBox>
          <HeaderCart>
            <HeaderCartTop>
              <IconArrowLeft onClick={() => setShowedMobileCart(false)} />
              {client.id ? (
                <IconClearClient onClick={handleClearClient} />
              ) : (
                <AddUser />
              )}
            </HeaderCartTop>
            <HeaderCartSearch>
              {client.id ? (
                <ClientInfo>
                  <ClientName>{client.name}</ClientName>
                  <ClientPhone>{client.phone}</ClientPhone>
                </ClientInfo>
              ) : (
                <Input
                  type="search"
                  value={searchU}
                  onChange={onChangeSearchUsers}
                  placeholder="Введите номер/ФИО клиента"
                  isSearch
                />
              )}
            </HeaderCartSearch>
          </HeaderCart>
          <CartRowMobile>
            <List
              products={products}
              editable={editable}
              currency={currency}
              totalInfo={totalInfo}
              handleEdit={handleEdit}
              handleRemoveProduct={handleRemoveProduct}
              handleAddOne={handleAddOne}
              handleRemoveOne={handleRemoveOne}
              handleClearCart={handleClearCart}
              handleOpenModalPayment={handleOpenModalPayment}
            />
          </CartRowMobile>
          <CartTotalMobile>
            <CartTotalRow>
              <CartTotalRowTitle>Итого без скидки</CartTotalRowTitle>
              <CartTotalRowDivider></CartTotalRowDivider>
              <CartTotalRowValuer>{totalInfo.sum}</CartTotalRowValuer>
            </CartTotalRow>
            <CartTotalRow>
              <CartTotalRowTitle>Скидка</CartTotalRowTitle>
              <CartTotalRowDivider></CartTotalRowDivider>
              <CartTotalRowValuer>{totalInfo.discount}</CartTotalRowValuer>
            </CartTotalRow>
            <CartTotalRow>
              <CartTotalRowTitle bold>Итого</CartTotalRowTitle>
              <CartTotalRowDivider></CartTotalRowDivider>
              <CartTotalRowValuer bold>{totalInfo.total}</CartTotalRowValuer>
            </CartTotalRow>
            <CartBtnBox>
              <Button color="red" onClick={handleClearCart}>
                Отмена
              </Button>
              <Button onClick={handleOpenModalPayment} color="green">
                Оплата
              </Button>
            </CartBtnBox>
          </CartTotalMobile>
        </MobileBox>
      )}

      {isSmallTotalShowed && (
        <MobileTotal>
          <IconCartMobile onClick={handleClearCart} red={true}>
            <img src={iconCloseCart} alt="" />
          </IconCartMobile>
          <MobileTotalInfo onClick={() => setShowedMobileCart(true)}>
            <MobileTotalSum>Сумма: {totalInfo.total}</MobileTotalSum>
            <IconCartMobile>
              <img src={iconAcceptCart} alt="" />
            </IconCartMobile>
          </MobileTotalInfo>
        </MobileTotal>
      )}
    </>
  )
}

const MobileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  overflow-y: hidden;
`
const HeaderCart = styled.div`
  height: 160px;
  padding: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const CartRowMobile = styled.div`
  height: calc(100vh - 370px);
  overflow-y: auto;
  padding: 5px 5% 0;
`
const CartTotalMobile = styled.div`
  height: 220px;
  padding: 20px 5% 0 5%;
  box-shadow: var(--shadow-card);
  border-radius: 30px 30px 0 0;
`

const HeaderCartTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const MobileTotal = styled.div`
  position: fixed;
  bottom: 15px;
  width: 90%;
  left: 5%;
  padding: 0 3%;
  height: 66px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: var(--shadow-card);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const MobileTotalInfo = styled.div`
  height: 50px;
  width: calc(100% - 50px);
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  background-color: white;
  box-shadow: var(--shadow-card);
`
const MobileTotalSum = styled.div`
  font-size: 20px;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const IconCartMobile = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => (p.red ? 'var(--red)' : 'var(--blue)')};
`
const IconAccept = styled.img``
const ClientInfo = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4%;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: var(--shadow-card);
`
const ClientName = styled.div`
  font-size: 14px;
  width: 50%;
  text-align: left;
  overflow-y: hidden;
`
const ClientPhone = styled.div`
  font-size: 14px;
  color: grey;
  text-align: right;
  width: 50%;
`
const HeaderCartSearch = styled.div`
  width: 100%;
`
