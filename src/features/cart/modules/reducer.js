import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    products: []
}

const cart = createSlice({
    name: 'cartReducer',
    initialState,
    reducers: {
        setProducts(state, action) {

        }
    }
})

export const {
    setProducts
} = cart.actions

export default cart.reducer
