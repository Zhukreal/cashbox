import { mathRound2 } from 'lib/math'
import {createSelector} from "reselect";

const cartSelector = state => state.cart.products

export const getProducts = createSelector(
    cartSelector,
    (products) =>
        products.map(product => {
            const totalPrice = product.price * product.count
            const totalDiscount = totalPrice * (product.discount / 100)
            const currentPrice = mathRound2(totalPrice - totalDiscount)
            return {...product,
                totalPrice: totalPrice,
                totalDiscount: totalDiscount,
                currentPrice: currentPrice
            }
        })
)

export const getTotalInfo = createSelector(
    cartSelector,
    (products) => {
        const total = {
            sum: 0,
            discount: 0,
            total: 0
        }
        products.forEach(product => {
            const totalPrice = product.price * product.count
            const totalDiscount = totalPrice * (product.discount / 100)
            const currentPrice = mathRound2(totalPrice - totalDiscount)
            total.sum += totalPrice
            total.discount += totalDiscount
            total.total += currentPrice
        })
        return total

    }
)
