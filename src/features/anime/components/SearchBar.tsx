import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setQuery } from '../slices/searchSlice'
import React, { useEffect, useRef, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { useTranslation } from 'react-i18next'

export default function SearchBar() {
  const dispatch = useAppDispatch()
  const qStore = useAppSelector((s) => s.search.q)
  const [value, setValue] = useState(qStore)
  const debounced = useDebounce(value, 250)
  const { t } = useTranslation()

  // Commit debounced term to Redux
  useEffect(() => { dispatch(setQuery(debounced)) }, [debounced, dispatch])

  // Keep local input in sync with Redux when navigating back to Home
  useEffect(() => { setValue(qStore) }, [qStore])

  // Ensure latest input is saved to Redux on unmount (in case debounce hasn't fired yet)
  const latest = useRef(value)
  useEffect(() => { latest.current = value }, [value])
  useEffect(() => {
    return () => { dispatch(setQuery(latest.current)) }
  }, [dispatch])

  return (
    <TextField
      fullWidth
      placeholder={t('search-placeholder')}
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
