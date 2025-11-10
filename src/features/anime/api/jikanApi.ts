import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { SearchResponse, DetailResponse } from '../types'

export const jikanApi = createApi({
  reducerPath: 'jikanApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  tagTypes: ['Anime'],
  endpoints: (builder) => ({
    searchAnime: builder.query<SearchResponse, { q: string; page: number; limit: number }>({
      query: ({ q, page, limit }) => ({ url: 'anime', params: { q, page, limit, sfw: true } }),
      // Provide a stable cache key to allow RTKQ cancel when args change
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge(currentCache, newItems) { return Object.assign(currentCache, newItems) },
      forceRefetch({ currentArg, previousArg }) { return JSON.stringify(currentArg) !== JSON.stringify(previousArg) },
    }),
    getAnimeById: builder.query<DetailResponse, number>({
      query: (id) => `anime/${id}/full`,
      providesTags: (r, e, id) => { void r; void e; return [{ type: 'Anime', id }] },
    }),
  }),
})

export const { useSearchAnimeQuery, useGetAnimeByIdQuery } = jikanApi
