import AppLayout from '@/components/Layouts/AppLayout'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const Dashboard = () => {
    const [moviews, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('api/getPopularMovies')
                console.log(response.data.results)
                setMovies(response.data.results)
            } catch (error) {
                console.log(error)
            }
        }

        fetchMovies()
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Home
                </h2>
            }>
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            <Swiper
                spaceBetween={50}
                slidesPerView={5}
                onSlideChange={() => console.log('slide change')}
                onSwiper={swiper => console.log(swiper)}>
                {moviews.map(movie => (
                    <SwiperSlide key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </AppLayout>
    )
}

export default Dashboard
