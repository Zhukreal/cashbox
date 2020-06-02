import { createSlice } from '@reduxjs/toolkit'
import { SETTINGS } from 'lib/CONST'

const settingsDefault = {
  view: 'grid',
  info: {
    rest: true,
    vendorCode: true,
    image: true,
    code: true,
  },
  width: '57',
  purchaseEnabled: false
}
const settingsLS = localStorage.getItem(SETTINGS)
if(!settingsLS) localStorage.setItem(SETTINGS, JSON.stringify(settingsDefault))
const initialSettings = settingsLS ? JSON.parse(settingsLS) :  settingsDefault

let initialState = {
  isOpenedSidebar: false,
  isBlurredAll: false,
  settings: initialSettings,
  mode: 'sale' // 'sale, return_sale, purchase, return_purchase'
}

const common = createSlice({
  name: 'commonReducer',
  initialState,
  reducers: {
    toggleSidebar(state, action) {
      state.isOpenedSidebar = !state.isOpenedSidebar
    },
    showSidebar(state, action) {
      state.isOpenedSidebar = action.payload
    },
    setBlurredAll(state, action) {
      state.isBlurredAll = action.payload
    },
    setSettings(state, action) {
      state.settings = action.payload
    },
    setMode(state, action) {
      state.mode = action.payload
    },
  },
})

export const {
  toggleSidebar,
  showSidebar,
  setBlurredAll,
  setSettings,
  setMode
} = common.actions

export default common.reducer
