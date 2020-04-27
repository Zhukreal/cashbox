import { createSlice } from '@reduxjs/toolkit'
import {toOfferModel} from './model'

let initialState = {
    products: [],
    filteredProducts: [],
    isLoading: true,
    skip: 0,
    take: 16,
    hasMore: false,
    isFirstRequest: true
}

const product = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload
        },
        setProducts(state, action) {
            const { data } = action.payload
            state.isFirstRequest = false
            state.skip = state.skip + state.take
            state.hasMore = data.length === state.take
            const modifiedProducts = data.map(offer => toOfferModel(offer))
            // temp fix if user came from offer page
            if(state.products.length === 1) state.products = []
            state.products = [...state.products, ...modifiedProducts]
        },
        setFilteredProducts(state, action) {
            const { data } = action.payload
            state.filteredProducts = data.map(offer => toOfferModel(offer))
        }
    }
})

export const {
    setLoading,
    setProducts,
    setFilteredProducts
} = product.actions


export default product.reducer
