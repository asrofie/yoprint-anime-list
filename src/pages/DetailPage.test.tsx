import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from '@/lib/muiTheme'
import { rootReducer } from '@/store/rootReducer'
import DetailPage from './DetailPage'
import { i18n } from '@/config/i18n'

// Mock RTK Query module used by DetailPage and rootReducer
vi.mock('../features/anime/api/jikanApi', () => {
  const dummyReducer = (state = {}, _action: any) => state
  return {
    useGetAnimeByIdQuery: vi.fn(() => ({ data: undefined, isFetching: false, isError: false, error: undefined })),
    jikanApi: { reducerPath: 'jikanApi', reducer: dummyReducer, middleware: () => (next: any) => (action: any) => next(action) },
  }
})

import { useGetAnimeByIdQuery } from '../features/anime/api/jikanApi'

function renderWithProviders(initialEntry = '/anime/1') {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: { search: { q: '', page: 1, limit: 12 } } as any,
    middleware: (gdm) => gdm(),
  })
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter initialEntries={[initialEntry]}>
          <Routes>
            <Route path="/anime/:id" element={<DetailPage />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  )
}

describe('DetailPage', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    // Keep language in English to avoid triggering translation side-effects
    await i18n.changeLanguage('en')
  })

  it('shows spinner while loading', () => {
    ;(useGetAnimeByIdQuery as any).mockReturnValue({ isFetching: true, isError: false })
    renderWithProviders('/anime/1')
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('shows error when request fails', () => {
    ;(useGetAnimeByIdQuery as any).mockReturnValue({ isFetching: false, isError: true })
    renderWithProviders('/anime/1')
    expect(screen.getByText(/Failed to load details/i)).toBeInTheDocument()
  })

  it('renders details when data is available', async () => {
    const mock = {
      data: {
        mal_id: 1,
        title: 'Attack on Titan',
        title_japanese: '進撃の巨人',
        synopsis: 'Humanity fights Titans.',
        score: 9.0,
        episodes: 25,
        year: 2013,
        status: 'Finished Airing',
        url: 'https://myanimelist.net/anime/1',
        images: { webp: { image_url: 'https://example.com/aot.webp' }, jpg: { image_url: 'https://example.com/aot.jpg' } },
        genres: [{ name: 'Action' }, { name: 'Drama' }],
      },
    }
    ;(useGetAnimeByIdQuery as any).mockReturnValue({ isFetching: false, isError: false, data: mock })

    renderWithProviders('/anime/1')

    const titleNodes = await screen.findAllByText('Attack on Titan')
    expect(titleNodes.length).toBeGreaterThan(0)
    expect(await screen.findByText(/Finished Airing/i)).toBeInTheDocument()
    expect(await screen.findByText(/episodes/i)).toBeInTheDocument()
    expect(await screen.findByText('View on MyAnimeList')).toBeInTheDocument()
  })
})
