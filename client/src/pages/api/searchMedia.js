import axios from 'axios'

const handler = async (req, res) => {
    const { searchQuery } = req.query

    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
                searchQuery,
            )}&api_key=${process.env.TMDB_API_KEY}&language=ja-JP`,
        )
        console.log(response.data)
        res.status(200).json(response.data)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'エラーが発生しました' })
    }
}

export default handler
