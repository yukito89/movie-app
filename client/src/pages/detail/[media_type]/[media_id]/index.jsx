import AppLayout from '@/components/Layouts/AppLayout'
import { Box, Container, Grid, Typography } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import React from 'react'

const Detail = ({ detail }) => {
    const posterPath = detail.poster_path
        ? `https://image.tmdb.org/t/p/original${detail.poster_path}`
        : 'media_poster_img/no-image.png'
    const backdropPath = detail.backdrop_path
        ? `https://image.tmdb.org/t/p/original${detail.backdrop_path}`
        : 'media_poster_img/no-image.png'
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail
                </h2>
            }>
            <Head>
                <title>Laravel - Detail</title>
            </Head>

            <Box
                sx={{
                    height: { xs: 'auto', md: '70vh' },
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                <Box
                    sx={{
                        backgroundImage: `url(${backdropPath})`,
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',

                        // 疑似要素によるぼかし専用のレイヤー
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(10px)',
                        },
                    }}
                />
                <Container sx={{ zIndex: 1 }}>
                    <Grid
                        container
                        alignItems={'center'}
                        sx={{ color: 'white' }}>
                        <Grid
                            size={{ xs: 12, md: 4 }}
                            sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box
                                component="img"
                                sx={{
                                    width: { xs: '50%', md: '70%' },
                                }}
                                src={posterPath}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Typography variant="h4" mb={2}>
                                {detail.title}
                            </Typography>
                            <Typography variant="body1" mb={2}>
                                {detail.overview}
                            </Typography>
                            <Typography variant="h6" mb={2}>
                                公開日：{detail.release_date}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </AppLayout>
    )
}

// SSR
export async function getServerSideProps(context) {
    const { media_type, media_id } = context.params

    try {
        const jpResponse = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`,
        )

        let conbinedData = { ...jpResponse.data }

        if (!conbinedData.overview) {
            const enResponse = await axios.get(
                `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
            )
            conbinedData.overview = enResponse.data.overview
        }

        return {
            props: { detail: conbinedData },
        }
    } catch {
        return { notFound: true }
    }
}

export default Detail
