import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  products: [],
  isLoadingPayment: false,
  currentPayment: {},
  currentReceipt: {
    // id: "3f4682de-0852-4b82-9288-f383123f4ba4",
    // ofd_qr: "ODcuMjU1LjIxNS45NC90Lz9pPTE4MjYzODYyOTM2MSZmPTAwMDAyNjE4JnM9NzAwLjAmdD0yMDIwMDUyNlQyMjQ0MDA=",
    // receipt: "ICAgICAgICAgINCX0JDQniDQotCj0KEKICBLcm9wb3RraW5hLCDQtC45MSDQvtGELjc3NwogICDQkdCY0J0v0JjQmNCdIDExMTExMTExMTExMTMKICDQndCU0KEg0YHQtdGA0LjRjzoyMjIzIOKEljo0NTY2NTQKLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQogINCa0LDRgdGB0LBf0Y/QvdC6ICB8ICAg0KHQvNC10L3QsCA3OQogINCf0L7RgNGP0LTQutC+0LLRi9C5INC90L7QvNC10YAg0YfQtdC60LAg4oSWNgogICAgICAgICAgICAgICAgINCf0LXRgtGA0L7QsiDQn9C10YLRgAogICAgICAgICAgICAgICAgICAgINCf0LXRgtGA0L7QstC40YcK0J/QoNCe0JTQkNCW0JAKLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQoKMS4g0LvRjtCx0L7QuSDRgtC+0LLQsNGAICAgICAgICAgICAgICAKICAgMSwwMDAgeCAxMjUsMDAgICAgIDEyNSwwMAogICDQodGC0L7QuNC80L7RgdGC0YwgICAgICAgICAgMTI1LDAwCgrQndCw0LvQuNGH0L3Ri9C1OiAgICAgICAgICAgICAxMjUsMDAK0J/QvtC70YPRh9C10L3QvdCw0Y8g0YHRg9C80LzQsDogICAgIDUwMCwwMArQodGD0LzQvNCwINGB0LTQsNGH0Lg6ICAgICAgICAgIDM3NSwwMArQmNCi0J7Qk9CeOiAgICAgICAgICAgICAgICAxMjUsMDAK0LIg0YIu0YcuINCd0JTQoTogICAgICAgICAgICAxMywzOQoKLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQogICAgICAg0KTQuNGB0LrQsNC70YzQvdGL0Lkg0YfQtdC6CtCQ0J4g0KLQldCh0KIxCtCk0LjRgdC6LiDQv9GA0LjQt9C90LDQuiDihJYgNzMxMDA3NDk2OTc0CtCS0YDQtdC80Y86IDI1LjA1LjIwMjAgMTc6MDQ6NDcKICAgICAgINCg0J3QnDogMDAwMDI2MTgKICAgICAg0JfQndCcOiBMSzAwMDAyNjE4CiAqKiog0KHQn9CQ0KHQmNCR0J4g0JfQkCDQn9Ce0JrQo9Cf0JrQoyAqKio=",
    // total_sum: 125,
  },
}

const cart = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    addProduct(state, action) {
      const product = { ...action.payload }
      const addedProduct = state.products.find((item) => product.id === item.id)
      if (addedProduct) {
        addedProduct.count++
      } else {
        product.count = product.count ? product.count : 1
        state.products.unshift(product)
      }
    },
    editProduct(state, action) {
      const productEditable = action.payload
      state.products = state.products.map((item) =>
        item.id === productEditable.id ? productEditable : item,
      )
    },
    removeOne(state, action) {
      const productCart = action.payload
      const list = state.products.map((item) => {
        if (item.id === productCart.id) {
          item.count--
        }
        return item
      })
      state.products = list.filter(
        (item) => item.id !== productCart.id || item.count,
      )
    },
    removeProduct(state, action) {
      const productId = action.payload
      state.products = state.products.filter((item) => item.id !== productId)
    },
    clearCart(state) {
      state.products = []
    },
    setIsLoadingPayment(state, action) {
      state.isLoadingPayment = action.payload
    },
    setCurrentPayment(state, action) {
      state.currentPayment = action.payload
    },
    setCurrentReceipt(state, action) {
      state.currentReceipt = action.payload
    },
  },
})

export const {
  addProduct,
  editProduct,
  removeOne,
  removeProduct,
  clearCart,
  setIsLoadingPayment,
  setCurrentPayment,
  setCurrentReceipt,
} = cart.actions

export default cart.reducer
