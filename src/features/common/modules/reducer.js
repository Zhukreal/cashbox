import { createSlice } from '@reduxjs/toolkit'


let initialState = {
    isOpenedSidebar: false,
    isBlurredAll: false
}

const common = createSlice({
    name: 'commonReducer',
    initialState,
    reducers: {
        toggleSidebar (state, action) {
            state.isOpenedSidebar = !state.isOpenedSidebar
        },
        showSidebar (state, action) {
            state.isOpenedSidebar = action.payload
        },
        setBlurredAll (state, action) {
            state.isBlurredAll = action.payload
        }
    }
})

export const {
    toggleSidebar,
    showSidebar,
    setBlurredAll
} = common.actions


export default common.reducer
