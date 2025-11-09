import { useParams, Link as RouterLink } from 'react-router-dom'
import { useGetAnimeByIdQuery } from '../features/anime/api/jikanApi'
import { Box, Breadcrumbs, Chip, Grid, Link, Typography, Alert } from '@mui/material'
import { Spinner } from '@/components/common'

export default function DetailPage() {
  const { id } = useParams<{ id: string }>()
  const malId = Number(id)
  const { data, isFetching, isError } = useGetAnimeByIdQuery(malId)

  if (isFetching) return <Spinner />
  if (isError || !data) return <Alert severity="error">Failed to load details.</Alert>

  const a = data.data
  const img = a.images.webp?.image_url || a.images.jpg?.image_url

  return (
    <Box>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/">Home</Link>
        <Typography color="text.primary">{a.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {img && <img src={img} alt={a.title} style={{ width: '100%', borderRadius: 16 }} />}
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>{a.title}</Typography>
          {a.title_japanese && <Typography variant="subtitle1" color="text.secondary">{a.title_japanese}</Typography>}
          <Box sx={{ my: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {a.score ? <Chip label={`⭐ ${a.score}`} /> : null}
            {a.year ? <Chip label={a.year} /> : null}
            {a.status ? <Chip label={a.status} /> : null}
            {a.episodes ? <Chip label={`${a.episodes} episodes`} /> : null}
            {a.genres?.slice(0, 5).map((g) => <Chip key={g.name} label={g.name} variant="outlined" />)}
          </Box>
          <Typography sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>{a.synopsis || 'No synopsis.'}</Typography>
          {a.url && (
            <Link href={a.url} target="_blank" rel="noreferrer" sx={{ mt: 2, display: 'inline-block' }}>
              View on MyAnimeList
            </Link>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}