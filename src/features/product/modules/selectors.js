import { createSelector } from 'reselect'
import { store } from 'lib/store/store'

const productSelector = (state) => state.product.products
const cartSelector = (state) => state.cart.products

export const getProducts = createSelector(
  productSelector,
  cartSelector,
  (products, cartProducts) =>
    products.map((product) => {
      const found = cartProducts.find((item) => item.id === product.id),
        foundCount = found && found.count ? found.count : 0

      const { mode } = store.getState().common
      let price = product.priceStore
      if (mode === 'purchase' || mode === 'return_purchase') price = product.purchase

      let count = 0
      const haveRest = product.rest || product.rest === 0 // dont't include count for type "Service"
      if (mode === 'sale') count = product.rest - foundCount
      if (mode === 'return_sale') count = product.rest + foundCount
      if (mode === 'purchase') count = product.rest + foundCount
      if (mode === 'return_purchase') count = product.rest - foundCount
      const currentCount = haveRest ? count : null

      return { ...product, currentCount: currentCount, price: price }
    }),
)
