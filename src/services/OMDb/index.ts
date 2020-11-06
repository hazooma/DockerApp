import omdbApi from './api'

const api = omdbApi({ apiKey: process.env.OMBD_API_KEY })

export const fetchMovieDetail = async (
  movieName: string
): Promise<MovieDetail | null> => {
  const foundMovie = (await api.get('', { s: movieName })).Response === 'True'
  if (foundMovie) {
    const movieDetail = await api.get('', { t: movieName })
    return movieDetail
  }
  return null
}

interface MovieDetail {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
}
