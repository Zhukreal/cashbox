import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    products: []
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
                product.count = 1
                state.products.push(product)
            }
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
        }
    }
})

export const {
    addProduct,
    removeOne
} = cart.actions

export default cart.reducer
