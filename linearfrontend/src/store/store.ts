import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from './slices/dashboardSlice'
import uiReducer from './slices/uiSlice'
import filterReducer from './slices/filterSlice'

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    ui: uiReducer,
    filter: filterReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
