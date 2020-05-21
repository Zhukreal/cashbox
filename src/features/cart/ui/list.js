import React, { useState } from 'react'
import { Button } from 'ui'
import minusIcon from 'static/img/icons/minus-s.png'
import plusGreen from 'static/img/icons/plus-green.svg'
import minusRed from 'static/img/icons/minus-red.svg'
import noPhoto from 'static/img/no-photo.png'
import closeCard from 'static/img/icons/close-card.png'
import {
  Close,
  CartItemInfoDiscount,
  CartCol,
  CartItemAvatar,
  CartItemInfo,
  CartItemInfoTitle,
  CartItemInfoPrice,
  CartItemCount,
  CartItemCountIcon,
  CartItemCountIcon2,
  CartItemCountValue,
  Icon,
  IconImg,
} from './styled'

export const List = ({
  products,
  editable,
  currency,
  handleEdit,
  handleRemoveProduct,
  handleAddOne,
  handleRemoveOne,
}) => {
  return (
    <>
      {products.map((item) => (
        <CartCol
          key={item.name}
          onClick={() => handleEdit(item)}
          active={editable.id === item.id}
        >
          <Close
            onClick={(e) => handleRemoveProduct(e, item.id)}
            active={editable.id === item.id}
          >
            <img src={closeCard} alt="" />
          </Close>
          <CartItemAvatar src={item.image ? item.image : noPhoto} />
          <CartItemInfo>
            <CartItemInfoTitle>{item.name}</CartItemInfoTitle>
            {!!item.discount && (
              <CartItemInfoDiscount>
                Скидка: {item.totalDiscount} {currency}
              </CartItemInfoDiscount>
            )}
            <CartItemInfoPrice>
              {item.currentPrice} {currency}
            </CartItemInfoPrice>
          </CartItemInfo>
          <CartItemCount>
            <CartItemCountIcon
              onClick={(e) => handleAddOne(e, item)}
              active={editable.id === item.id}
            >
              <Icon>+</Icon>
            </CartItemCountIcon>
            <CartItemCountValue>
              {item.count} {item.unit}
            </CartItemCountValue>
            <CartItemCountIcon2 onClick={(e) => handleRemoveOne(e, item)}>
              <IconImg src={minusIcon} />
            </CartItemCountIcon2>
          </CartItemCount>
        </CartCol>
      ))}
    </>
  )
}
