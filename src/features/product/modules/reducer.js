import { createSlice } from '@reduxjs/toolkit'
import {toModel} from './model'

let initialState = {
    products: [],
    filteredProducts: [],
    isLoading: true,
    skip: 0,
    take: 16,
    hasMore: false,
    groups: [],
    isLoadingGroups: true,
    cashStatus: false,
    sections: []
}

const product = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload
        },
        setProducts(state, action) {
            const { results } = action.payload
            state.isFirstRequest = false
            state.skip = state.skip + state.take
            state.hasMore = results.length === results.take
            const modifiedProducts = results.map(product => toModel(product))
            state.products = [...state.products, ...modifiedProducts]
        },
        setFilteredProducts(state, action) {
            const { data } = action.payload
            // state.filteredProducts = data.map(offer => toOfferModel(offer))
        },
        setGroups(state, action) {
            const { results } = action.payload
            state.groups = results
            state.isLoadingGroups = false
        },
        setLoadingGroups(state, action) {
            state.isLoadingGroups = action.payload
        },
        setCashStatus(state, action) {
            state.cashStatus = action.payload
        },
        setSections(state, action) {
            const { results } = action.payload
            state.sections = results
        }
    }
})

export const {
    setLoading,
    setLoadingGroups,
    setProducts,
    setFilteredProducts,
    setGroups,
    setCashStatus,
    setSections
} = product.actions


export default product.reducer
