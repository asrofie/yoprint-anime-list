import { AppBar, Toolbar, Typography, Container, Stack, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import logo from '@/assets/logo.png'

export default function Header() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'malay' ? 'malay' : 'en'
  const handleLang = (_: unknown, value: 'en' | 'malay' | null) => {
    if (value) i18n.changeLanguage(value)
  }

  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <Stack direction="row" spacing={1} component={Link} to="/" sx={{ textDecoration: 'none', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: 60, width: 'auto' }} />
            <Typography variant="h6">
              {t('anime-finder')}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <ToggleButtonGroup size="small" exclusive value={lang} onChange={handleLang} aria-label="language">
              <ToggleButton value="en" aria-label="English">EN</ToggleButton>
              <ToggleButton value="malay" aria-label="Malay">MY</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
