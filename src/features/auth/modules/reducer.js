import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from "browser-cookies";

let initialState = {
    isLoading: false
}

const auth = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
        login(state, action) {
            const {id, firstName, lastName} = action.payload
            state.id = id
            state.firstName = firstName
            state.lastName = lastName
            state.isAuth = true
            Cookies.set('auth-token', '1234567890')
        }
    }
})

export const {
    setIsLoading,
    login
} = auth.actions

export default auth.reducer