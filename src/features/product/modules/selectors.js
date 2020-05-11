
const productState = state => state.product
const cartState = state => state.cart

export const products = () => state => productState(state).products.map(product => {
    const cartProducts = cartState(state).products
    const found = cartProducts.find(item => item.id === product.id),
        foundCount = (found && found.count) ? found.count : 0
    return {...product, currentCount: product.min_rest - foundCount}
})
