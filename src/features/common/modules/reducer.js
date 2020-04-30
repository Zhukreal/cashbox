import { createSlice } from '@reduxjs/toolkit'


let initialState = {
    isOpenedSidebar: false
}

const common = createSlice({
    name: 'commonReducer',
    initialState,
    reducers: {
        toggleSidebar (state) {
            state.isOpenedSidebar = !state.isOpenedSidebar
        }
    }
})

export const {
    toggleSidebar
} = common.actions


export default common.reducer
