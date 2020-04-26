import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from "browser-cookies";

let initialState = {
    isLoading: false,
    isExpiredSession: false
}

const auth = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
        setExpiredSession(state, action) {
            state.isExpiredSession = action.payload
        }
    }
})

export const {
    setIsLoading,
    setExpiredSession
} = auth.actions

export default auth.reducer