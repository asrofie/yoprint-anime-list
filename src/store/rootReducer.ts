import { combineReducers } from '@reduxjs/toolkit'
import { jikanApi } from '../features/anime/api/jikanApi'
import searchReducer from '../features/anime/slices/searchSlice'

export const rootReducer = combineReducers({
  [jikanApi.reducerPath]: jikanApi.reducer,
  search: searchReducer,
})
export type RootReducer = ReturnType<typeof rootReducer>