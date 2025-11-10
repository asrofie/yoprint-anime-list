import { Grid, Box, Typography, Alert } from '@mui/material'
import SearchBar from '../features/anime/components/SearchBar'
import AnimeCard from '../features/anime/components/AnimeCard'
import PaginationBar from '../features/anime/components/PaginationBar'
import { useSearchAnimeQuery } from '../features/anime/api/jikanApi'
import { useAppSelector } from '@/store/hooks'
import { SkeletonCard } from '@/components/common'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation()
  const { q, page, limit } = useAppSelector((s) => s.search)
  const { data, isFetching, isError, error } = useSearchAnimeQuery({ q, page, limit }, { skip: q.trim().length === 0 })

  const totalPages = data?.pagination?.last_visible_page ?? 0

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>{t('search')}</Typography>
      <SearchBar />

      {q.trim().length === 0 && (
        <Alert sx={{ mt: 2 }} severity="info">Start typing to search. Try "Boku no Hero Academia".</Alert>
      )}

      {isError && (
        <Alert sx={{ mt: 2 }} severity="error">{(error as any)?.status ? `Error ${(error as any).status}` : 'Network error'} — please try again.</Alert>
      )}

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {isFetching && Array.from({ length: limit }).map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={3}><SkeletonCard /></Grid>
        ))}

        {!isFetching && data?.data?.length === 0 && q && (
          <Grid item xs={12}><Alert severity="warning">No results for "{q}"</Alert></Grid>
        )}

        {!isFetching && data?.data?.map((anime) => (
          <Grid key={anime.mal_id} item xs={12} sm={6} md={3}>
            <AnimeCard anime={anime} />
          </Grid>
        ))}
      </Grid>

      {!isFetching && data && totalPages > 1 && <PaginationBar totalPages={totalPages} />}
    </Box>
  )
}

