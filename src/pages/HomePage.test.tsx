import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from '@/lib/muiTheme'
import { rootReducer } from '@/store/rootReducer'
import HomePage from './HomePage'
import '@/config/i18n'

// Mock RTK Query module used in HomePage and rootReducer
vi.mock('../features/anime/api/jikanApi', () => {
  const dummyReducer = (state = {}, _action: any) => state
  return {
    useSearchAnimeQuery: vi.fn(() => ({ data: undefined, isFetching: false, isError: false, error: undefined })),
    jikanApi: { reducerPath: 'jikanApi', reducer: dummyReducer, middleware: () => (next: any) => (action: any) => next(action) },
  }
})

import { useSearchAnimeQuery } from '../features/anime/api/jikanApi'

function renderWithProviders(preloaded?: Partial<ReturnType<typeof rootReducer>>) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: { search: { q: '', page: 1, limit: 12 }, ...(preloaded as any) },
    middleware: (gdm) => gdm(),
  })
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  )
}

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders heading and search input when q is empty', () => {
    ;(useSearchAnimeQuery as any).mockReturnValue({ data: undefined, isFetching: false, isError: false })
    renderWithProviders({ search: { q: '', page: 1, limit: 12 } })

    // Heading (localized, so just assert it exists)
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument()
    // Search input present
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    // Info alert shown when q is empty
    expect(screen.getByText(/Start typing to search/i)).toBeInTheDocument()
  })

  it('shows "No results" alert when query has no results', () => {
    ;(useSearchAnimeQuery as any).mockReturnValue({
      data: { data: [], pagination: { last_visible_page: 0, current_page: 1, has_next_page: false, items: { count: 0, total: 0, per_page: 12 } } },
      isFetching: false,
      isError: false,
    })

    const q = 'nonexistent'
    renderWithProviders({ search: { q, page: 1, limit: 12 } })

    expect(screen.getByText(new RegExp(`No results for "${q}"`, 'i'))).toBeInTheDocument()
  })
})
