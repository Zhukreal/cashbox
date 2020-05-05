import { createSlice } from '@reduxjs/toolkit'
import {toModel} from './model'

let initialState = {
    users: [],
    searchUser: '',
    isLoadingUsers: false
}

const user = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUsers(state, action) {
            const { results } = action.payload
            state.users = results
        },
        setSearch(state, action) {
            state.searchUser = action.payload
            if(!action.payload) state.users = []
        },
        setLoadingList(state, action) {
            state.isLoadingUsers = action.payload
        }
    }
})

export const {
    setUsers,
    setSearch,
    setLoadingList
} = user.actions


export default user.reducer
