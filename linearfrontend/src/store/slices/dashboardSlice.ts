import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DashboardStats } from '@/types/dashboard'

export interface DashboardState {
  stats: DashboardStats | null
  lastUpdated: string | null
  refreshInterval: number // in seconds
}

const initialState: DashboardState = {
  stats: null,
  lastUpdated: null,
  refreshInterval: 30, // default 30 seconds
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardStats: (state, action: PayloadAction<DashboardStats>) => {
      state.stats = action.payload
      state.lastUpdated = new Date().toISOString()
    },
    setRefreshInterval: (state, action: PayloadAction<number>) => {
      state.refreshInterval = action.payload
    },
    clearDashboardStats: (state) => {
      state.stats = null
      state.lastUpdated = null
    },
  },
})

export const { setDashboardStats, setRefreshInterval, clearDashboardStats } = dashboardSlice.actions

export default dashboardSlice.reducer
