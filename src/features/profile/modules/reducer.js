import { createSlice } from '@reduxjs/toolkit'
import Cookies from "browser-cookies";

import {AUTHTOKEN} from 'lib/CONST'


let initialState = {
    id: null,
    isAuth: false,
    cashes: []
}

const profile = createSlice({
    name: 'profileReducer',
    initialState,
    reducers: {
        setProfile(state, action) {
            const {token, id, firstName, lastName, cashes} = action.payload
            state.id = id
            state.firstName = firstName
            state.lastName = lastName
            state.isAuth = true
            state.cashes = cashes
            if(token) Cookies.set(AUTHTOKEN, token)
        },
        clearProfile(state, action) {
            state.id = null
            state.firstName = null
            state.lastName = null
            state.isAuth = false
            state.cashes = []
            Cookies.erase(AUTHTOKEN)
        }
    }
})

export const {
    setProfile,
    clearProfile
} = profile.actions


export default profile.reducer
