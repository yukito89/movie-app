import { Box, TextField, Button } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const SearchBar = () => {
    const [query, setQuery] = useState('')
    const router = useRouter()

    const handleChange = e => {
        setQuery(e.target.value)
    }

    const searchQuery = e => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`search?query=${query}`)
        }
    }

    return (
        <Box
            onSubmit={searchQuery}
            component={'form'}
            sx={{
                width: '70%',
                margin: '2rem auto',
                display: 'flex',
                alignItems: 'center',
            }}>
            <TextField
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="検索する"
                size="small"
                sx={{ mr: 2 }}
            />
            <Button
                type="submit"
                variant="contained"
                disabled={!query.trim()}
                sx={{
                    borderRadius: '20px',
                    height: 40,
                }}>
                検索
            </Button>
        </Box>
    )
}

export default SearchBar
