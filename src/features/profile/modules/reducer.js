import { createSlice } from '@reduxjs/toolkit'
import Cookies from "browser-cookies";

import {AUTHTOKEN} from 'lib/CONST'


let initialState = {
    isAuth: false,
    id: null,
    firstName: null,
    lastName: null,
    currency: null,
    cashes: [],
    isLoadingCloseShift: false,
    isLoadingReport: false,
    currentReport: {}
}

const profile = createSlice({
    name: 'profileReducer',
    initialState,
    reducers: {
        setProfile(state, action) {
            const {id, first_name, last_name, currency, cashes} = action.payload
            state.id = id
            state.firstName = first_name
            state.lastName = last_name
            state.currency = currency
            state.isAuth = true
            state.cashes = cashes
            // if(token) Cookies.set(AUTHTOKEN, token)
        },
        clearProfile(state, action) {
            state.id = null
            state.firstName = null
            state.lastName = null
            state.isAuth = false
            state.cashes = []
            localStorage.removeItem(AUTHTOKEN)
            // Cookies.erase(AUTHTOKEN)
        },
        setIsLoadingCloseShift(state, action) {
            state.isLoadingCloseShift = action.payload
        },
        setIsLoadingReport(state, action) {
            state.isLoadingReport = action.payload
        },
        setCurrentReport(state, action) {
            state.currentReport = action.payload
        }
    }
})

export const {
    setProfile,
    clearProfile,
    toggleSidebar,
    setIsLoadingCloseShift,
    setIsLoadingReport,
    setCurrentReport
} = profile.actions


export default profile.reducer
