import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface CommitActivity {
  week: number;
  total: number;
}

// Define a type for the slice state
export interface Repo {
  id: number,
  name: string,
  owner: string,
  stars: number,
  updatedAt: string,
  commitActivity?: CommitActivity[]
}

export interface Suggestions {
  open: boolean,
}

// Define the initial state using that type
const initialState : Suggestions = {
  open: false
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    closeSuggestions: (state) => {
      state.open = false;
    },
    openSuggestions: (state) => {
      state.open = true;
    }
  }
})

export const { openSuggestions, closeSuggestions } = searchSlice.actions

export const getOpenSuggestions = (state: RootState) => state.search.open;

export default searchSlice.reducer