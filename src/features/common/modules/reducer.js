import { createSlice } from '@reduxjs/toolkit'
import {VIEWTYPE} from 'lib/CONST'

let initialState = {
  isOpenedSidebar: false,
  isBlurredAll: false,
  typeViewProduct: localStorage.getItem(VIEWTYPE) || 'grid' // grid, list
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
    setTypeViewProduct(state, action) {
      state.typeViewProduct = action.payload
    },
  },
})

export const { toggleSidebar, showSidebar, setBlurredAll, setTypeViewProduct } = common.actions

export default common.reducer
