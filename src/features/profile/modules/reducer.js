import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'browser-cookies'

import { AUTHTOKEN } from 'lib/CONST'

let initialState = {
  isAuth: false,
  id: null,
  firstName: null,
  lastName: null,
  currency: null,
  cashes: [],
  isLoadingCloseShift: false,
  isLoadingReport: false,
  currentReport: {},
  currentShift: {},
  isLoadingCashKassa: false,
  isLoadingInfoKassa: false,
  infoKassa: [],
}

const profile = createSlice({
  name: 'profileReducer',
  initialState,
  reducers: {
    setProfile(state, action) {
      const { id, first_name, last_name, currency, cashes } = action.payload
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
    setCashStatus(state, action) {
      state.currentShift = action.payload
    },
    setIsLoadingCloseShift(state, action) {
      state.isLoadingCloseShift = action.payload
    },
    setIsLoadingReport(state, action) {
      state.isLoadingReport = action.payload
    },
    setCurrentReport(state, action) {
      state.currentReport = action.payload
    },
    setIsLoadingCashKassa(state, action) {
      state.isLoadingCashKassa = action.payload
    },
    setIsLoadingInfoKassa(state, action) {
      state.isLoadingInfoKassa = action.payload
    },
    setInfoKassa(state, action) {
      state.infoKassa = action.payload
    },
  },
})

export const {
  setProfile,
  clearProfile,
  toggleSidebar,
  setIsLoadingCloseShift,
  setIsLoadingReport,
  setCurrentReport,
  setCashStatus,
  setIsLoadingCashKassa,
  setIsLoadingInfoKassa,
  setInfoKassa,
} = profile.actions

export default profile.reducer
