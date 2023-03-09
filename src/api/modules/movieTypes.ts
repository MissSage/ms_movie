import request from '../axios'
export const getMovieTypes = (params?: IQueryParams) => {
  return request({
    url: '/api/movietypes',
    method: 'get',
    params,
  })
}
export const postMovieType = (params: any) => {
  return request({
    url: '/api/movietypes',
    method: 'post',
    data: { types: params },
  })
}

export const updateMovieType = (id: string, params: any) => {
  return request({
    url: '/api/movietypes/' + id,
    method: 'put',
    data: { types: params },
  })
}
