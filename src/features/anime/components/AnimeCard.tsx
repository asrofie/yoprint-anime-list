import { Card, CardActionArea, CardContent, Typography, CardMedia, Chip, Stack } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { Link } from 'react-router-dom'
import type { Anime } from '../types'

export default function AnimeCard({ anime }: { anime: Anime }) {
  const img = anime.images.webp?.image_url || anime.images.jpg?.image_url
  return (
    <Card>
      <CardActionArea component={Link} to={`/anime/${anime.mal_id}`}>
        {img && <CardMedia component="img" height="220" image={img} alt={anime.title} />}
        <CardContent>
          <Typography variant="subtitle1" noWrap>{anime.title}</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            {anime.score ? <Chip size="small" icon={<StarIcon fontSize="small" />} label={anime.score} /> : null}
            {anime.year ? <Chip size="small" label={anime.year} /> : null}
            {anime.episodes ? <Chip size="small" label={`${anime.episodes} ep`} /> : null}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

