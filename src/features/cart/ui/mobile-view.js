import React, {useState, useEffect} from "react"
import styled, { css } from "styled-components"
import {useDispatch, useSelector} from "react-redux";
import {useDebounce} from "lib/customHooks/useDebounce";
import {AddUser, userActions, UsersList} from "features/user";
import {Button, Input, Modal, StyledButton} from 'ui'
import minusIcon from 'static/img/icons/minus-s.png'
import noPhoto from 'static/img/no-photo.png'
import closeCard from 'static/img/icons/close-card.png'
import iconCloseCart from 'static/img/icons/close-cart-mob.svg'
import iconAcceptCart from 'static/img/icons/accept-cart-mob.svg'
import {
    CartBox,
    CartBtnBox,
    CartCol,
    CartItemAvatar, CartItemCount, CartItemCountIcon, CartItemCountIcon2, CartItemCountValue,
    CartItemInfo,
    CartItemInfoDiscount,
    CartItemInfoPrice,
    CartItemInfoTitle,
    CartRow, CartTotal, CartTotalRow, CartTotalRowDivider, CartTotalRowTitle, CartTotalRowValuer,
    Close, Icon, IconImg
} from "./styled";
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
                               handleClearClient
                           }) => {

    const isSmallTotalShowed = !!(products.length && !isShowedMobileCart)
    const isFullShowed = !!(products.length && isShowedMobileCart)


    return (
        <>
            {isFullShowed &&
            <MobileBox >
                <HeaderCart>
                    <HeaderCartTop>
                        <IconArrowLeft onClick={() => setShowedMobileCart(false)} />
                        <CenterBox>
                            {client.id ?
                                <ClientInfo>
                                    <ClientName>{client.name}</ClientName>
                                    <ClientPhone>{client.phone}</ClientPhone>
                                </ClientInfo>
                                :
                                <Input
                                    type='search'
                                    value={searchU}
                                    onChange={onChangeSearchUsers}
                                    placeholder='Введите номер/ФИО клиента'
                                    isSearch
                                />
                            }
                        </CenterBox>
                        {client.id ?
                            <IconClearClient onClick={handleClearClient} />
                            :
                            <AddUser />
                        }
                    </HeaderCartTop>

                </HeaderCart>
                <CartRowMobile>
                    {products.map(item =>
                        <CartCol
                            key={item.name}
                            onClick={() => handleEdit(item)}
                            active={editable.id === item.id}
                        >
                            <Close
                                onClick={(e) => handleRemoveProduct(e, item.id)}
                                active={editable.id === item.id}
                            >
                                <img src={closeCard} alt=""/>
                            </Close>
                            <CartItemAvatar src={item.image ? item.image : noPhoto } />
                            <CartItemInfo>
                                <CartItemInfoTitle>{item.name}</CartItemInfoTitle>
                                {!!item.discount && <CartItemInfoDiscount>Скидка: {item.discount}%</CartItemInfoDiscount>}
                                <CartItemInfoPrice>{item.currentPrice} {currency}</CartItemInfoPrice>
                            </CartItemInfo>
                            <CartItemCount>
                                <CartItemCountIcon
                                    onClick={(e) => handleAddOne(e, item)}
                                    active={editable.id === item.id}
                                >
                                    <Icon>+</Icon>
                                </CartItemCountIcon>
                                <CartItemCountValue>{item.count} {item.unit}</CartItemCountValue>
                                <CartItemCountIcon2 onClick={(e) => handleRemoveOne(e, item)} >
                                    <IconImg src={minusIcon} />
                                </CartItemCountIcon2>
                            </CartItemCount>
                        </CartCol>
                    )}
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
                        <Button
                            color='red'
                            onClick={handleClearCart}
                        >
                            Отмена
                        </Button>
                        <Button
                            onClick={handleOpenModalPayment}
                            color='green'
                        >
                            Оплата
                        </Button>
                    </CartBtnBox>
                </CartTotalMobile>
            </MobileBox>
            }

            {isSmallTotalShowed &&
            <MobileTotal>
                <IconCartMobile
                    onClick={handleClearCart}
                    red={true}
                >
                    <img src={iconCloseCart} alt=""/>
                </IconCartMobile>
                <MobileTotalInfo
                    onClick={() => setShowedMobileCart(true)}
                >
                    <MobileTotalSum>Сумма: {totalInfo.total}</MobileTotalSum>
                    <IconCartMobile>
                        <img src={iconAcceptCart} alt=""/>
                    </IconCartMobile>
                </MobileTotalInfo>
            </MobileTotal>
            }
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
  height: 100px;
  padding: 5%;
`
const CartRowMobile = styled.div`
  height: calc(100vh - 320px);
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

const MobileTotal = styled.div `
    position: fixed;
    bottom: 15px;
    width: 90%;
    left: 5%;
    padding: 0 3%;
    height: 66px;
    background: rgba(255,255,255,0.8);
    box-shadow: var(--shadow-card);
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const MobileTotalInfo = styled.div `
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
const MobileTotalSum = styled.div `
    font-size: 20px;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const IconCartMobile = styled.div `
    width: 36px;
    height: 36px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${p => p.red ? 'var(--red)' : 'var(--blue)'};
`
const IconAccept = styled.img`
    
`
const ClientInfo = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 4%;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: var(--shadow-card);
`
const ClientName = styled.div`
   font-size: 14px;
   width: 100%;
   text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const ClientPhone = styled.div`
  font-size: 12px;
  color: grey;
`
const CenterBox = styled.div`
  width: calc(100% - 130px);
`