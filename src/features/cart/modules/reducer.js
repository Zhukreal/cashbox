import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    products: [],
    isLoadingPayment: false,
    currentPayment: {}
}

const cart = createSlice({
    name: 'cartReducer',
    initialState,
    reducers: {
        addProduct(state, action) {
            const product = {...action.payload}
            const addedProduct = state.products.find(item => product.id === item.id)
            if(addedProduct){
                addedProduct.count++
            } else {
                product.count = product.count ? product.count : 1
                state.products.unshift(product)
            }
        },
        editProduct(state, action) {
            const productEditable = action.payload
            state.products = state.products.map(item => item.id === productEditable.id ? productEditable : item)

        },
        removeOne(state, action) {
            const productCart = action.payload
            const list = state.products.map(item => {
                if(item.id === productCart.id) {
                    item.count--
                }
                return item
            })
            state.products = list.filter(item => ((item.id !== productCart.id) || item.count))
        },
        removeProduct(state, action) {
            const productId = action.payload
            state.products = state.products.filter(item => ((item.id !== productId)))
        },
        clearCart(state) {
            state.products = []
        },
        setIsLoadingPayment(state, action) {
            state.isLoadingPayment = action.payload
        },
        setCurrentPayment (state, action) {
            state.currentPayment = action.payload
        }
    }
})

export const {
    addProduct,
    editProduct,
    removeOne,
    removeProduct,
    clearCart,
    setIsLoadingPayment,
    setCurrentPayment
} = cart.actions

export default cart.reducer
