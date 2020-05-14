import { createSelector } from 'reselect'

const productSelector = state => state.product.products
const cartSelector = state => state.cart.products


// export const products = () => state => productState(state).products.map(product => {
//     const cartProducts = cartState(state).products
//     const found = cartProducts.find(item => item.id === product.id),
//         foundCount = (found && found.count) ? found.count : 0,
//         currentCount = (product.rest || product.rest === 0) ? (product.rest - foundCount) : null
//
//     return {...product, currentCount: currentCount}
// })

export const getProducts = createSelector(
    productSelector,
    cartSelector,
    (products, cartProducts) =>
        products.map(product => {
            const found = cartProducts.find(item => item.id === product.id),
                foundCount = (found && found.count) ? found.count : 0,
                currentCount = (product.rest || product.rest === 0) ? (product.rest - foundCount) : null
            return {...product, currentCount: currentCount}
        })
)