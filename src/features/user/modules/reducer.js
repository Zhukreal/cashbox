import { createSlice } from '@reduxjs/toolkit'
import { toModel } from './model'

let initialState = {
  users: [],
  client: {
    // id: 1,
    // name: 'Жук Юрий',
    // phone: '+3753339204234',
    // email: 'zhukreal@gmail.com'
  },
  searchUser: '',
  isLoadingUsers: false,
  isLoadingAddNew: false,
  showedModalAdd: false,
}

const user = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUsers(state, action) {
      const { results } = action.payload
      state.users = results
    },
    setClient(state, action) {
      state.client = action.payload
    },
    setSearch(state, action) {
      state.searchUser = action.payload
      if (!action.payload) state.users = []
    },
    setLoadingList(state, action) {
      state.isLoadingUsers = action.payload
    },
    setLoadingAddNew(state, action) {
      state.isLoadingAddNew = action.payload
    },
    setShowedAdd(state, action) {
      state.showedModalAdd = action.payload
    },
  },
})

export const {
  setUsers,
  setClient,
  setSearch,
  setLoadingList,
  setLoadingAddNew,
  setShowedAdd,
} = user.actions

export default user.reducer
