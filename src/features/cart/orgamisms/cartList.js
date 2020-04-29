import * as React from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"
import {Container, Row, Col, Button, StyledButton} from 'ui'

export const CartList = ({
        list,
        isLoading
    }) => {
    return (
        <CartBox>
            <CartRow>
                {list.map(item =>
                    <CartCol
                        key={item.id}
                    >
                        <CartItemAvatar src={item.avatarUrl} />
                        <CartItemInfo>
                            <CartItemInfoTitle>{item.name}</CartItemInfoTitle>
                            <CartItemInfoPrice>12 тнг</CartItemInfoPrice>
                        </CartItemInfo>
                        <CartItemCount>
                            <CartItemCountIcon>+</CartItemCountIcon>
                            <CartItemCountValue>12 кг</CartItemCountValue>
                            <CartItemCountIcon red >-</CartItemCountIcon>
                        </CartItemCount>
                    </CartCol>
                )}
            </CartRow>
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
        </CartBox>

    )
}

const CartBox = styled.div`
    width: 420px;
    //width: 270px;
    max-width: inherit;
    position: fixed;
    height: calc(100vh - 150px);
`
const CartRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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
  height: 190px;
  margin-bottom: 2em;
  padding: 0 40px;
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
    width: 120px;
    height: 120px;
    border-radius: 60px;
`
const CartItemInfo = styled.div`
    font-size: 18px;
    width: 130px;
    height: 120px;
    display: flex;
    flex-direction: column;
    //align-items: center;
    justify-content: space-between;
    padding: 0 10px;
`
const CartItemInfoTitle = styled.div`
    font-size: 27px;
    overflow-y: hidden;
    text-overflow: ellipsis;
    font-family: GilroyBold, sans-serif;
`
const CartItemInfoPrice = styled.div`
    font-size: 28px;
`
const CartItemCount = styled.div`
    width: 70px;
    min-width: 70px;
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
    opacity: 0.9;
   }
   
   ${(p) =>
    p.red &&
    css`
      background-color: var(--red);
    `}
`
const CartItemCountValue = styled.div`
   font-size: 28px;
   margin: 5px 0;
`


