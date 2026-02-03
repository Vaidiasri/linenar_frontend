import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FilterState {
  status: string[]
  priority: number[]
  assignee: string | null
  team: string | null
  searchQuery: string
}

const initialState: FilterState = {
  status: [],
  priority: [],
  assignee: null,
  team: null,
  searchQuery: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<string[]>) => {
      state.status = action.payload
    },
    setPriorityFilter: (state, action: PayloadAction<number[]>) => {
      state.priority = action.payload
    },
    setAssigneeFilter: (state, action: PayloadAction<string | null>) => {
      state.assignee = action.payload
    },
    setTeamFilter: (state, action: PayloadAction<string | null>) => {
      state.team = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    clearFilters: (state) => {
      state.status = []
      state.priority = []
      state.assignee = null
      state.team = null
      state.searchQuery = ''
    },
  },
})

export const {
  setStatusFilter,
  setPriorityFilter,
  setAssigneeFilter,
  setTeamFilter,
  setSearchQuery,
  clearFilters,
} = filterSlice.actions

export default filterSlice.reducer
