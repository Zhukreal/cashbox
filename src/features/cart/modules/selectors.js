import { mathRound2 } from 'lib/math'

const cartState = state => state.cart

export const products = () => state => {
    return cartState(state).products.map(product => {
        const totalPrice = product.price * product.count
        const totalDiscount = totalPrice * (product.discount / 100)
        const currentPrice = mathRound2(totalPrice - totalDiscount)
        return {...product,
            totalPrice: totalPrice,
            totalDiscount: totalDiscount,
            currentPrice: currentPrice
        }
    })
}

export const totalInfo = () => state => {
    const total = {
        sum: 0,
        discount: 0,
        total: 0
    }

    cartState(state).products.forEach(product => {
        const totalPrice = product.price * product.count
        const totalDiscount = totalPrice * (product.discount / 100)
        const currentPrice = mathRound2(totalPrice - totalDiscount)
        total.sum += totalPrice
        total.discount += totalDiscount
        total.total += currentPrice
    })
    return total
}