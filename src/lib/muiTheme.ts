import { createTheme } from '@mui/material/styles'
const theme = createTheme({
  palette: { mode: 'light', primary: { main: '#7C3AED' } },
  shape: { borderRadius: 16 },
  components: { MuiCard: { styleOverrides: { root: { overflow: 'hidden' } } } },
})
export default theme;