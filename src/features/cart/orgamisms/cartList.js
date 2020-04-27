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
                            {item.name} <br/>
                            12 тнг
                        </CartItemInfo>
                        <CartItemCount>
                            + <br/>
                            2 <br/>
                            -
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
                    <CartTotalRowTitle>Итого</CartTotalRowTitle>
                    <CartTotalRowDivider></CartTotalRowDivider>
                    <CartTotalRowValuer>2309</CartTotalRowValuer>
                </CartTotalRow>
                <CartBtnBox>
                    <Button
                        color='red'
                        size='small'
                    >
                        Отмена
                    </Button>
                    <Button
                        color='green'
                        size='small'
                    >
                        Оплата
                    </Button>
                </CartBtnBox>
            </CartTotal>
        </CartBox>

    )
}

const CartBox = styled.div`
    width: 100%;
    max-width: inherit;
    position: fixed;
    height: calc(100vh - 15rem);
`
const CartRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: calc(100vh - 30rem);
    overflow-y: auto;
`
const CartCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  min-height: 100px;
  margin-bottom: 2em;
  padding: 10px;
  border-radius: 30px;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
`
const CartTotal = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 11rem;
    padding: 10px;
    border-radius: 30px;
    background-color: #ffffff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.161);
`
const CartItemAvatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`
const CartItemInfo = styled.div`
    font-size: 18px;
    width: 100%;
    padding: 0 10px;
`
const CartItemCount = styled.div`
    width: 50px;

`
const CartTotalRow = styled.div`
   display: flex;
   justify-content: space-between;
   margin-bottom: 10px;
`
const CartTotalRowTitle = styled.div`
   white-space: nowrap;
`
const CartTotalRowDivider = styled.div`
     width: 100%;
    border-bottom: 1px solid #7d7d7d;
    position: relative;
    top: -5px;
    margin: 0 5px;
`
const CartTotalRowValuer = styled.div`
   
`
const CartBtnBox = styled.div`
   display: flex;
   justify-content: space-between;
   
   ${StyledButton} {
    width: 49%;
   }
`



