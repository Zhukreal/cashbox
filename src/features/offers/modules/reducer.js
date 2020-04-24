import { createSlice } from '@reduxjs/toolkit'
import {toOfferModel} from './model'

let initialState = {
    offers: [],
    filteredOffers: [],
    offer: {},
    isLoading: true,
    skip: 0,
    take: 10,
    hasMore: false,
    isFirstRequest: true
}

const offers = createSlice({
    name: 'offersReducer',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload
        },
        setOffers(state, action) {
            const { data } = action.payload
            state.isFirstRequest = false
            state.skip = state.skip + state.take
            state.hasMore = data.length === state.take
            const modifiedOffers = data.map(offer => toOfferModel(offer))
            // temp fix if user came from offer page
            if(state.offers.length === 1) state.offers = []
            state.offers = [...state.offers, ...modifiedOffers]
        },
        setFilteredOffers(state, action) {
            const { data } = action.payload
            state.filteredOffers = data.map(offer => toOfferModel(offer))
        },
        setOffer(state, action) {
            state.offers.push(toOfferModel(action.payload))
        }
    }
})

export const {
    setLoading,
    setOffers,
    setFilteredOffers,
    setOffer
} = offers.actions


export default offers.reducer
