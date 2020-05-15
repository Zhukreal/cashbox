import React, {useState} from "react"
import {Button} from 'ui'
import minusIcon from 'static/img/icons/minus-s.png'
import noPhoto from 'static/img/no-photo.png'
import closeCard from 'static/img/icons/close-card.png'
import {CartBox, CartRow, Close, CartItemInfoDiscount, CartCol, CartTotal, CartItemAvatar, CartItemInfo,
    CartItemInfoTitle, CartItemInfoPrice, CartItemCount, CartTotalRow, CartTotalRowTitle, CartTotalRowDivider,
    CartTotalRowValuer, CartBtnBox, CartItemCountIcon, CartItemCountIcon2, CartItemCountValue, Icon, IconImg} from './styled'


export const DesktopView = ( {
                          products,
                         editable,
                         currency,
                         totalInfo,
                          handleEdit,
                          handleRemoveProduct,
                          handleAddOne,
                          handleRemoveOne,
                          handleClearCart,
                          handleOpenModalPayment
                      }) => {
    return (
        <CartBox>
            <CartRow>
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
            </CartRow>
            <CartTotal>
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
                {!!products.length &&
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
                }
            </CartTotal>
        </CartBox>
    )
}
