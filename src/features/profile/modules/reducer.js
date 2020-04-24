import { createSlice } from '@reduxjs/toolkit'
import Cookies from "browser-cookies";

import {AUTHTOKEN} from '../../../lib/CONST'


let initialState = {
    id: null,
    isAuth: false
}

const profile = createSlice({
    name: 'profileReducer',
    initialState,
    reducers: {
        setProfile(state, action) {
            const {token, id, firstName, lastName} = action.payload
            state.id = id
            state.firstName = firstName
            state.lastName = lastName
            state.isAuth = true
            if(token) Cookies.set(AUTHTOKEN, token)
        },
        clearProfile(state, action) {
            state.id = null
            state.firstName = null
            state.lastName = null
            state.isAuth = false
            Cookies.erase(AUTHTOKEN)
        }
    }
})

export const {
    setProfile,
    clearProfile
} = profile.actions


export default profile.reducer
