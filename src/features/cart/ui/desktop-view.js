import React, { useState } from 'react'
import { Button } from 'ui'
import { List } from './list'
import {
  CartBox,
  CartRow,
  CartTotal,
  CartTotalRow,
  CartTotalRowTitle,
  CartTotalRowDivider,
  CartTotalRowValuer,
  CartBtnBox,
} from './styled'

export const DesktopView = ({
  products,
  editable,
  currency,
  totalInfo,
  mode,
  handleEdit,
  handleRemoveProduct,
  handleAddOne,
  handleRemoveOne,
  handleClearCart,
  handleOpenModalPayment,
}) => {
  return (
    <CartBox>
      <CartRow>
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
        {!!products.length && (
          <CartBtnBox>
            <Button color="red" onClick={handleClearCart}>
              Отмена
            </Button>
            <Button
              onClick={handleOpenModalPayment}
              color={mode === 'return_sale' || mode === 'return_purchase' ? 'yellow' : 'green'}
            >
              {mode === 'sale' && 'Оплата'}
              {mode === 'purchase' && 'Покупка'}
              {(mode === 'return_sale' || mode === 'return_purchase') && 'Возврат'}
            </Button>
          </CartBtnBox>
        )}
      </CartTotal>
    </CartBox>
  )
}
