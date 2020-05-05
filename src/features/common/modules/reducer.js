import { createSlice } from '@reduxjs/toolkit'


let initialState = {
    isOpenedSidebar: false
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
        }
    }
})

export const {
    toggleSidebar,
    showSidebar
} = common.actions


export default common.reducer
