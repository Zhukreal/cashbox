import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  products: [],
  isLoadingPayment: false,
  currentPayment: {},
  currentReceipt: {
    id: "b4ea83f0-708d-4ac3-82f9-7edd07e51342",
    receipt: "ICAgICAgICAgINCX0JDQniDQotCj0KEKICBLcm9wb3RraW5hLCDQtC45MSDQvtGELjc3NwogICDQkdCY0J0v0JjQmNCdIDExMTExMTExMTExMTMKICDQndCU0KEg0YHQtdGA0LjRjzoyMjIzIOKEljo0NTY2NTQKLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQogINCa0LDRgdGB0LBf0Y/QvdC6ICB8ICAg0KHQvNC10L3QsCA3MQogINCf0L7RgNGP0LTQutC+0LLRi9C5INC90L7QvNC10YAg0YfQtdC60LAg4oSWMwogICAgICAgICAgICAgICAgINCf0LXRgtGA0L7QsiDQn9C10YLRgAogICAgICAgICAgICAgICAgICAgINCf0LXRgtGA0L7QstC40YcK0J/QoNCe0JTQkNCW0JAKLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQoKMS4gc2FsdCAgICAgICAgICAgICAgICAgICAgIAogICAxLDAwMCB4IDMwMCwwMCAgICAgMzAwLDAwCiAgINCh0YLQvtC40LzQvtGB0YLRjCAgICAgICAgICAzMDAsMDAKCtCd0LDQu9C40YfQvdGL0LU6ICAgICAgICAgICAgIDMwMCwwMArQn9C+0LvRg9GH0LXQvdC90LDRjyDRgdGD0LzQvNCwOiAgICAgNTAwLDAwCtCh0YPQvNC80LAg0YHQtNCw0YfQuDogICAgICAgICAgMjAwLDAwCtCY0KLQntCT0J46ICAgICAgICAgICAgICAgIDMwMCwwMArQsiDRgi7Rhy4g0J3QlNChOiAgICAgICAgICAgIDMyLDE0CgotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCiAgICAgICDQpNC40YHQutCw0LvRjNC90YvQuSDRh9C10LoK0JDQniDQotCV0KHQojEK0KTQuNGB0LouINC/0YDQuNC30L3QsNC6IOKEliA2NzQ1Njg0NTcwMTcK0JLRgNC10LzRjzogMTkuMDUuMjAyMCAxMzozNDo0NQogICAgICAg0KDQndCcOiAwMDAwMjYxOAogICAgICDQl9Cd0Jw6IExLMDAwMDI2MTgKICoqKiDQodCf0JDQodCY0JHQniDQl9CQINCf0J7QmtCj0J/QmtCjICoqKg==",
    total_sum: 300
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
