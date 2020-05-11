import {createSlice} from '@reduxjs/toolkit'
import {toModel} from './model'

const initialSorting = localStorage.getItem('activeSorting')

let initialState = {
    products: [],
    filteredProducts: [],
    isLoading: true,
    skip: 0,
    take: 16,
    initialTake: 16,
    hasMore: false,
    groups: [],
    activeGroup: {},
    isLoadingGroups: true,
    currentShift: {},
    sections: [],
    activeSection: {},
    searchFilter: '',
    sorting: ['popularity', 'name'],
    activeSorting: initialSorting ? initialSorting : 'name'
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
            console.log('state.hasMore', state.hasMore)
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
            state.currentShift = action.payload
        },
        setSections(state, action) {
            const { results } = action.payload
            state.sections = results
        },
        setSearchFilter(state, action) {
            state.skip = 0
            state.searchFilter = action.payload
        },
        setSection(state, action) {
            if (state.activeSection.id === action.payload.id) {
                state.activeSection = {}
            } else {
                state.activeSection = action.payload
            }
        },
        setGroup(state, action) {
            if (state.activeGroup.id === action.payload.id) {
                state.activeGroup = {}
            } else {
                state.activeGroup = action.payload
            }
        },
        setSorting(state, action) {
            state.activeSorting = action.payload
        },
        resetFilters(state, action) {
            state.skip = 0
            state.take = state.initialTake
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
    setGroup,
    setCashStatus,
    setSections,
    setSection,
    setSearchFilter,
    setSorting,
    resetFilters
} = product.actions


export default product.reducer
