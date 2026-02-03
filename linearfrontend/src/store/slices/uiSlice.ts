import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Theme = 'light' | 'dark' | 'system'
type ChartType = 'pie' | 'bar'

export interface UiState {
  sidebarCollapsed: boolean
  theme: Theme
  chartType: ChartType
}

const initialState: UiState = {
  sidebarCollapsed: false,
  theme: 'system',
  chartType: 'pie',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
    },
    setChartType: (state, action: PayloadAction<ChartType>) => {
      state.chartType = action.payload
    },
  },
})

export const { toggleSidebar, setSidebarCollapsed, setTheme, setChartType } = uiSlice.actions

export default uiSlice.reducer
