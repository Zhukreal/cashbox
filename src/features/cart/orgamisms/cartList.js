import React from "react"
import {useDispatch, useSelector} from "react-redux";
import styled, { css } from "styled-components"
import { Button, StyledButton} from 'ui'
import plusIcon from 'static/img/icons/plus-s.png'
import minusIcon from 'static/img/icons/minus-s.png'
import noPhoto from 'static/img/no-photo.png'
import {cartActions} from "../index";


export const CartList = () => {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.cart)
    const { currency } = useSelector(state => state.profile)

    const handleAddOne = (product) => {
        dispatch(cartActions.addToCart(product))
    }
    const handleRemoveOne = (product) => {
        dispatch(cartActions.removeOne(product))
    }


    return (
        <CartBox>
            <CartRow>
                {products.map(item =>
                    <CartCol
                        key={item.name}
                    >
                        <CartItemAvatar src={item.image ? item.image : noPhoto } />
                        <CartItemInfo>
                            <CartItemInfoTitle>{item.name}</CartItemInfoTitle>
                            {!!item.discount && <CartItemInfoDiscount>Скидка: {item.discount}</CartItemInfoDiscount>}
                            <CartItemInfoPrice>{item.base_price} {currency}</CartItemInfoPrice>
                        </CartItemInfo>
                        <CartItemCount>
                            <CartItemCountIcon onClick={() => handleAddOne(item)}>
                                <Icon src={plusIcon} />
                            </CartItemCountIcon>
                            <CartItemCountValue>{item.count} {item.unit}</CartItemCountValue>
                            <CartItemCountIcon onClick={() => handleRemoveOne(item)} red >
                                <Icon src={minusIcon} />
                            </CartItemCountIcon>
                        </CartItemCount>
                    </CartCol>
                )}
            </CartRow>
            {!!products.length &&
                <CartTotal>
                    <CartTotalRow>
                        <CartTotalRowTitle>Итого без скидки</CartTotalRowTitle>
                        <CartTotalRowDivider></CartTotalRowDivider>
                        <CartTotalRowValuer>2309</CartTotalRowValuer>
                    </CartTotalRow>
                    <CartTotalRow>
                        <CartTotalRowTitle>Скидка</CartTotalRowTitle>
                        <CartTotalRowDivider></CartTotalRowDivider>
                        <CartTotalRowValuer>2309</CartTotalRowValuer>
                    </CartTotalRow>
                    <CartTotalRow>
                        <CartTotalRowTitle bold>Итого</CartTotalRowTitle>
                        <CartTotalRowDivider></CartTotalRowDivider>
                        <CartTotalRowValuer bold>2309</CartTotalRowValuer>
                    </CartTotalRow>
                    <CartBtnBox>
                        <Button
                            color='red'
                        >
                            Отмена
                        </Button>
                        <Button
                            color='green'
                        >
                            Оплата
                        </Button>
                    </CartBtnBox>
                </CartTotal>
            }

        </CartBox>

    )
}

const CartBox = styled.div`
    width: 100%;
    //width: 270px;
    max-width: inherit;
    position: fixed;
    height: calc(100vh - 150px);
    padding-top: 5px;
`
const CartRow = styled.div`
    //display: flex;
    //flex-wrap: wrap;
    //justify-content: space-between;
    height: calc(100vh - 450px);
    padding: 0 5px;
    overflow-y: auto;
`
const CartCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 170px;
  margin-bottom: 2em;
  padding: 0 20px;
  border-radius: 30px;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
`
const CartTotal = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 250px;
    border-radius: 30px;
    padding: 30px;
    background-color: #ffffff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.161);
`
const CartItemAvatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50px;
`
const CartItemInfo = styled.div`
    font-size: 18px;
    width: 180px;
    height: 120px;
    display: flex;
    flex-direction: column;
    //align-items: center;
    justify-content: space-between;
    padding: 0 10px;
`
const CartItemInfoTitle = styled.div`
    font-size: 22px;
    max-height: 75px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: GilroyBold, sans-serif;
`
const CartItemInfoDiscount = styled.div`
    font-size: 15px;
    color: #6D82A3; 
`
const CartItemInfoPrice = styled.div`
    font-size: 28px;
`
const CartItemCount = styled.div`
    width: 80px;
    min-width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const CartTotalRow = styled.div`
   display: flex;
   justify-content: space-between;
   margin-bottom: 20px;
`
const CartTotalRowTitle = styled.div`
   white-space: nowrap;
   font-size: 20px;
   
   ${(p) =>
    p.bold &&
    css`
      font-family: GilroyBold, sans-serif;
    `}
`
const CartTotalRowDivider = styled.div`
     width: 100%;
    border-bottom: 1px solid #7d7d7d;
    position: relative;
    top: -5px;
    margin: 0 5px;
`
const CartTotalRowValuer = styled.div`
   font-size: 20px;
   
   ${(p) =>
    p.bold &&
    css`
      font-family: GilroyBold, sans-serif;
    `}
`
const CartBtnBox = styled.div`
   display: flex;
   justify-content: space-between;
   
   ${StyledButton} {
    width: 49%;
   }
`
const CartItemCountIcon = styled.div`
   width: 20px;
   height: 20px;
   font-size: 18px;
   border-radius: 10px;
   display: flex;
   align-items: center;
   justify-content: center;
   color: #ffffff;
   background-color: var(--green);
   cursor: pointer;
   
   &:hover {
    background-color: var(--green-hover);
   }
   
   ${(p) =>
    p.red &&
    css`
      background-color: var(--red);
      
      &:hover {
        background-color: var(--red-hover);
       }
    `}
`
const CartItemCountValue = styled.div`
   font-size: 28px;
   margin: 5px 0;
`
const Icon = styled.img``

