import { Card, CardContent, Skeleton, Stack } from '@mui/material'
export default function SkeletonCard() {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={180} />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="60%" />
        </Stack>
      </CardContent>
    </Card>
  )
}