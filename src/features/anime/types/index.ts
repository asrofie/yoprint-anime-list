export type Anime = {
  mal_id: number
  url: string
  images: { jpg?: { image_url?: string }; webp?: { image_url?: string } }
  title: string
  title_japanese?: string
  synopsis?: string
  score?: number
  episodes?: number
  year?: number
  status?: string
  genres?: { name: string }[]
}

export type Pagination = {
  last_visible_page: number
  current_page: number
  has_next_page: boolean
  items: { count: number; total: number; per_page: number }
}

export type SearchResponse = { data: Anime[]; pagination: Pagination }
export type DetailResponse = { data: Anime }