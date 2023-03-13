import request from '../axios'
export const getMovieStarrings = (params?: IQueryParams) => {
  return request({
    url: '/api/moviestarrings',
    method: 'get',
    params,
  })
}
export const postMovieStarring = (params: any) => {
  return request({
    url: '/api/moviestarrings',
    method: 'post',
    data: { starrings: params },
  })
}

export const updateMovieStarring = (id: string, params: any) => {
  return request({
    url: '/api/moviestarrings/' + id,
    method: 'put',
    data: { starrings: params },
  })
}
