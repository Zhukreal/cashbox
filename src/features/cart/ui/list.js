import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { device } from 'lib/mediaDevice'
import { useDetectDevice } from 'lib/customHooks/useDetectDevice'
import { Button } from 'ui'


import minusIcon from 'static/img/icons/minus-s.png'
import plusGreen from 'static/img/icons/plus-green-white.svg'
import plusWhite from 'static/img/icons/plus-white-green.svg'
import minusRed from 'static/img/icons/minus-red-white.svg'

import noPhoto from 'static/img/no-photo.png'
import closeCard from 'static/img/icons/close-card.png'
import iconTrash from 'static/img/icons/trash.svg'
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
  const { settings, mode } = useSelector((state) => state.common)
  const currentDevice = useDetectDevice()
  const isMobileView = currentDevice.isMobile || currentDevice.isTablet
  const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop

  if (settings.view === 'list') {
    return (
      <>
        {products.map((item) => (
          <RowList
            key={item.name}
            onClick={() => handleEdit(item)}
            active={editable.id === item.id}
          >
            <RowWrap>
              <TitleList>{item.name}</TitleList>
              <CountList>
                {item.count} {item.unit}
              </CountList>
              <PriceList>
                {item.currentPrice} {currency}
              </PriceList>
            </RowWrap>

            <IconDelete
              onClick={(e) => handleRemoveProduct(e, item.id)}
            >
              <img src={iconTrash} alt="t"/>
            </IconDelete>

            {/*<CartItemCount>*/}
            {/*  <CartItemCountIcon*/}
            {/*    onClick={(e) => handleAddOne(e, item)}*/}
            {/*    active={editable.id === item.id}*/}
            {/*  >*/}
            {/*    <Icon>+</Icon>*/}
            {/*  </CartItemCountIcon>*/}
            {/*  <CartItemCountValue>*/}
            {/*    {item.count} {item.unit}*/}
            {/*  </CartItemCountValue>*/}
            {/*  <CartItemCountIcon2 onClick={(e) => handleRemoveOne(e, item)}>*/}
            {/*    <IconImg src={minusIcon} />*/}
            {/*  </CartItemCountIcon2>*/}
            {/*</CartItemCount>*/}
          </RowList>
        ))}
      </>
    )
  }

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
            {(mode === 'sale' || mode === 'return_sale') && (
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
              {/*<Icon>+</Icon>*/}
              <IconImg src={editable.id === item.id ? plusWhite : plusGreen} />
            </CartItemCountIcon>
            <CartItemCountValue>
              {item.count} {item.unit}
            </CartItemCountValue>
            <CartItemCountIcon2 onClick={(e) => handleRemoveOne(e, item)}>
              <IconImg src={minusRed} />
            </CartItemCountIcon2>
          </CartItemCount>
        </CartCol>
      ))}
    </>
  )
}

const IconDelete = styled.div`
  min-width: 40px;
  //position: absolute;
  display: none;
  text-align: center;
  cursor: pointer;
  
  @media ${device.laptop}, ${device.mobileTablet} {
    img {
      width: 17px;  
    }
  }
`

const RowList = styled.div`
  //height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  //padding: 0 5%;
  //border-radius: 30px;
  //box-shadow: var(--shadow-card);
  //cursor: pointer;
  
  :hover {
    //width: calc(100% - 50px);
    ${IconDelete} {
       display: block;
    }
  }

  // @media ${device.laptop} {
  //   height: 60px;
  //   border-radius: 25px;
  // }
  //
  // @media ${device.mobileTablet} {
  //   height: 60px;
  // }
`
const RowWrap = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //margin-bottom: 20px;
  padding: 0 5%;
  border-radius: 30px;
  box-shadow: var(--shadow-card);
  cursor: pointer;

  @media ${device.laptop} {
    height: 60px;
    border-radius: 25px;
  }

  @media ${device.mobileTablet} {
    height: 60px;
  }
`

const TitleList = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 50%;
  overflow-y: hidden;

  @media ${device.laptop} {
    font-size: 18px;
  }

  @media ${device.mobileTablet} {
    height: auto;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
const CountList = styled.div`
  font-size: 20px;
  width: 20%;
  text-align: right;

  @media ${device.laptop} {
    font-size: 16px;
  }
  @media ${device.mobileTablet} {
    font-size: 14px;
  }
`
const PriceList = styled.div`
  font-size: 25px;
  width: 30%;
  text-align: right;

  @media ${device.laptop} {
    font-size: 16px;
  }

  @media ${device.mobileTablet} {
    font-size: 16px;
  }
`
