import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setQuery } from '../slices/searchSlice'
import React, { useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

export default function SearchBar() {
  const dispatch = useAppDispatch()
  const qStore = useAppSelector((s) => s.search.q)
  const [value, setValue] = useState(qStore)
  const debounced = useDebounce(value, 250)

  // Commit debounced term to Redux
  React.useEffect(() => { dispatch(setQuery(debounced)) }, [debounced, dispatch])

  return (
    <TextField
      fullWidth
      placeholder="Search anime (e.g., My Hero Academia)"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      autoFocus
      InputProps={{
        startAdornment: (
          <InputAdornment position="start"><SearchIcon /></InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton aria-label="clear" onClick={() => setValue('')}><ClearIcon /></IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  )
}