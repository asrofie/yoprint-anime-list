import { Container, Box } from '@mui/material'
import Header from './Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Header />
      <Container sx={{ py: 3 }}>{children}</Container>
    </Box>
  )
}