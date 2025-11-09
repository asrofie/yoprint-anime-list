import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type SearchState = { q: string; page: number; limit: number }
const initialState: SearchState = { q: '', page: 1, limit: 12 }

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) { state.q = action.payload; state.page = 1 },
    setPage(state, action: PayloadAction<number>) { state.page = action.payload },
    setLimit(state, action: PayloadAction<number>) { state.limit = action.payload; state.page = 1 },
    reset(state) { Object.assign(state, initialState) },
  },
})
export const { setQuery, setPage, setLimit, reset } = searchSlice.actions
export default searchSlice.reducer