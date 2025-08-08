import AppLayout from '@/components/Layouts/AppLayout'
import Layout from '@/components/Layouts/Layout'
import MediaCard from '@/components/MediaCard'
import SearchBar from '@/components/SearchBar'
import Sidebar from '@/components/Sidebar'
import { Grid } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const search = () => {
    const [category, setCategory] = useState('all')
    const [results, setResult] = useState([])
    const router = useRouter()
    const { query: searchQuery } = router.query

    useEffect(() => {
        if (!searchQuery) {
            return
        }
        const fetchMedia = async () => {
            try {
                const response = await axios.get(
                    `api/searchMedia?searchQuery=${searchQuery}`,
                )
                const searchResults = response.data.results
                const validResults = searchResults.filter(
                    item =>
                        item.media_type == 'movie' || item.media_type == 'tv',
                )
                setResult(validResults)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMedia()
    }, [searchQuery])

    const filterdResults = results.filter(result => {
        if (category == 'all') {
            return true
        }

        return result.media_type === category
    })

    console.log(filterdResults)

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Search
                </h2>
            }>
            <Head>
                <title>Laravel - Search</title>
            </Head>
            <SearchBar />
            <Layout sidebar={<Sidebar setCategory={setCategory} />}>
                <Grid container spacing={3}>
                    {filterdResults.map(media => (
                        <MediaCard key={media.id} item={media}/>
                    ))}
                </Grid>
            </Layout>
        </AppLayout>
    )
}

export default search
