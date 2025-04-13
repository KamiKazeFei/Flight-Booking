import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  isAuthenticated: boolean
}

interface UserState {
  currentUser: User | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.currentUser = null
    },
    registerStart: (state) => {
      state.loading = true
      state.error = null
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, registerStart, registerSuccess, registerFailure } =
  userSlice.actions

export default userSlice.reducer
