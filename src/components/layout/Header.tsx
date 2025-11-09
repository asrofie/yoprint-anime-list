import { AppBar, Toolbar, Typography, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Header() {
  const { t } = useTranslation()

  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        <Container sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none' }}>
            {t('anime-finder')}
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  )
}