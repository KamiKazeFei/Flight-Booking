import { configureStore } from "@reduxjs/toolkit"
import bookingReducer from "./slices/bookingSlice"
import userReducer from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
