import { CircularProgress, Box } from '@mui/material'
export default function Spinner() {
  return (
    <Box sx={{ display: 'grid', placeItems: 'center', py: 4 }}>
      <CircularProgress />
    </Box>
  )
}