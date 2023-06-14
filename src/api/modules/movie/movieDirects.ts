import request from '../../axios'
export const getMovieDirects = (params?: any) => {
  return request({
    url: '/api/moviedirects',
    method: 'get',
    params
  })
}
