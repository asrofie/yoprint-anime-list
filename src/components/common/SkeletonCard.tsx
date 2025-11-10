import { Card, CardContent, Skeleton, Stack } from '@mui/material'
export default function SkeletonCard() {
  return (
    <Card style={{
           justifyContent: 'flex-end' 
          }}>
      <CardContent>
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={220} />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </Stack>
      </CardContent>
    </Card>
  )
}