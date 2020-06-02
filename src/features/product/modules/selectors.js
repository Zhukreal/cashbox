import { createSelector } from 'reselect'
import { MODE } from 'lib/CONST'
import { store } from "lib/store/store";

const productSelector = (state) => state.product.products
const cartSelector = (state) => state.cart.products

export const getProducts = createSelector(
  productSelector,
  cartSelector,
  (products, cartProducts) =>
    products.map((product) => {
      const found = cartProducts.find((item) => item.id === product.id),
        foundCount = found && found.count ? found.count : 0

      const mode = localStorage.getItem(MODE)
      const { returnMode } = store.getState().common

      const haveRest = product.rest || product.rest === 0 // dont't include count for type "Service"
      let count = 0

      if (mode === 'purchase') {
        count = returnMode ?  product.rest - foundCount : product.rest + foundCount
      } else {
        count = returnMode ?  product.rest + foundCount : product.rest - foundCount
      }

      const currentCount = haveRest ? count : null
      return { ...product, currentCount: currentCount }
    }),
)
