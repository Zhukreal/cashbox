import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  isLoading: false,
  isExpiredSession: false,
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
    },
    setFailureConnection(state, action) {
      state.isFailureConnection = action.payload
    },
  },
})

export const {
  setIsLoading,
  setExpiredSession,
  setFailureConnection,
} = auth.actions

export default auth.reducer
