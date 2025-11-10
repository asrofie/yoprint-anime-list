import React from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { useGetAnimeByIdQuery } from '../features/anime/api/jikanApi'
import { Box, Breadcrumbs, Chip, Grid, Link, Typography, Alert, Stack } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { Spinner } from '@/components/common'
import { useTranslation } from 'react-i18next'
import { translateText } from '@/utils/translate'

export default function DetailPage() {
  const { id } = useParams<{ id: string }>()
  const malId = Number(id)
  const { data, isFetching, isError } = useGetAnimeByIdQuery(malId)
  const { i18n } = useTranslation()
  const lang = i18n.language === 'malay' ? 'malay' : 'en'

  const [translated, setTranslated] = React.useState<string | null>(null)
  const [tLoading, setTLoading] = React.useState(false)
  const [tError, setTError] = React.useState<string | null>(null)

  // Keep hooks at top-level; guard inside effect instead of conditional hook order
  React.useEffect(() => {
    setTranslated(null)
    setTError(null)
    setTLoading(false)
    const synopsis = data?.data?.synopsis
    if (!synopsis || lang === 'en') return
    const ac = new AbortController()
    setTLoading(true)
    translateText(synopsis, lang, { signal: ac.signal })
      .then((txt) => setTranslated(txt))
      .catch((e: any) => { if (e?.name !== 'AbortError') setTError(e?.message || 'Translate failed') })
      .finally(() => setTLoading(false))
    return () => ac.abort()
  }, [data?.data?.synopsis, lang])

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
            {a.score ? <Chip icon={<StarIcon fontSize="small" />} label={a.score} /> : null}
            {a.year ? <Chip label={a.year} /> : null}
            {a.status ? <Chip label={a.status} /> : null}
            {a.episodes ? <Chip label={`${a.episodes} episodes`} /> : null}
            {a.genres?.slice(0, 5).map((g) => <Chip key={g.name} label={g.name} variant="outlined" />)}
          </Box>
          <Box sx={{ mt: 2 }}>
            {lang === 'en' && (
              <Typography sx={{ whiteSpace: 'pre-wrap' }}>{a.synopsis || 'No synopsis.'}</Typography>
            )}
            {lang !== 'en' && (
              <Stack spacing={1}>
                {tLoading && <Typography variant="body2" color="text.secondary">Translating...</Typography>}
                {tError && <Alert severity="warning">{tError}</Alert>}
                <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                  {translated || a.synopsis || 'No synopsis.'}
                </Typography>
              </Stack>
            )}
          </Box>
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

