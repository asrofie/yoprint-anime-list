import { Pagination, Stack, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setPage } from '../slices/searchSlice'

export default function PaginationBar({ totalPages }: { totalPages: number }) {
  const dispatch = useAppDispatch()
  const page = useAppSelector((s) => s.search.page)
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
      <Typography variant="body2">Page {page} / {totalPages}</Typography>
      <Pagination color="primary" page={page} onChange={(_, p) => dispatch(setPage(p))} count={totalPages} shape="rounded" />
    </Stack>
  )
}