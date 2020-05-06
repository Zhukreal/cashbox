import {createSlice} from '@reduxjs/toolkit'
import {toModel} from './model'

let initialState = {
    products: [],
    filteredProducts: [],
    isLoading: true,
    skip: 0,
    take: 16,
    initialTake: 16,
    hasMore: false,
    groups: [],
    isLoadingGroups: true,
    cashStatus: false,
    sections: [],
    searchFilter: ''
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
            state.skip = state.initialTake
            state.hasMore = results.length === state.initialTake
            state.products = results.map(product => toModel(product))
        },
        setMoreProducts(state, action) {
            const { results } = action.payload
            state.skip = state.skip + state.take
            state.hasMore = results.length === state.take
            const modifiedProducts = results.map(product => toModel(product))
            state.products = [...state.products, ...modifiedProducts]
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
        },
        setSearchFilter(state, action) {
            state.skip = 0
            state.searchFilter = action.payload
        }
    }
})

export const {
    setLoading,
    setLoadingGroups,
    setProducts,
    setMoreProducts,
    setFilteredProducts,
    setGroups,
    setCashStatus,
    setSections,
    setSearchFilter
} = product.actions


export default product.reducer
