import { mathRound2 } from 'lib/math'
import { createSelector } from 'reselect'
import { MODE } from "lib/CONST";

const cartSelector = (state) => state.cart.products

export const getProducts = createSelector(cartSelector, (products) =>
  products.map((product) => {
    const totalPrice = product.price * product.count
    const mode = localStorage.getItem(MODE)
    let discount = product.discount
    if(mode === 'purchase') discount = 0
    const totalDiscount = Math.round(totalPrice * (discount / 100))
    const currentPrice = mathRound2(totalPrice - totalDiscount)
    return {
      ...product,
      totalPrice: totalPrice || 0,
      totalDiscount: totalDiscount || 0,
      currentPrice: currentPrice || 0,
    }
  }),
)

export const getTotalInfo = createSelector(getProducts, (products) => {
  const total = {
    sum: 0,
    discount: 0,
    total: 0,
  }
  products.forEach((product) => {
    total.sum += product.totalPrice || 0
    total.discount += product.totalDiscount || 0
    total.total += product.currentPrice || 0
  })
  return total
})
