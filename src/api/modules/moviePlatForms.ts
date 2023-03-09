import request from '../axios'
export const getMoviePlatForms = (params?: IQueryParams) => {
  return request({
    url: '/api/movieplatforms',
    method: 'get',
    params,
  })
}
export const postMoviePlatForm = (params: any) => {
  return request({
    url: '/api/movieplatforms',
    method: 'post',
    data: { platforms: params },
  })
}

export const updateMoviePlatForm = (id: string, params: any) => {
  return request({
    url: '/api/movieplatforms/' + id,
    method: 'put',
    data: { platforms: params },
  })
}
