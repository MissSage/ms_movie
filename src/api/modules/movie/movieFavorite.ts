import request from '../../axios'
export const toggleMovieFavorite = (id: string) => {
  return request({
    url: '/api/moviefavorite/toggle',
    method: 'post',
    data: {
      movieId: id,
    },
  })
}
export const getMovieFavorite = (movieId: string) => {
  return request({
    url: '/api/moviefavorite',
    method: 'get',
    params: {
      movieId: movieId,
    },
  })
}
