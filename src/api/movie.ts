import request from "./axios"
export const getMovies = (params?: IQueryParams) => {
  return request({
    url: "/api/movie",
    method: "get",
    params
  })
}
export const postMovie = (params: any) => {
  return request({
    url: "/api/movie",
    method: "post",
    data: params
  })
}

export const getMovie = (id: string) => {
  return request({
    url: '/api/movie/' + id,
    method: 'get'
  })
}
export const editMovie = (id: string, params: any) => {
  return request({
    url: '/api/movie/' + id,
    method: 'put',
    data: params
  })
}
export const importMovies = (params: { path: string, replacePath: string, tags: string }) => {
  return request({
    url: '/api/movie/import',
    method: 'post',
    data: params
  })
}
export const removeMovies = (ids: string[]) => {
  return request({
    url: '/api/movie',
    method: 'delete',
    data: { ids }
  })
}
export const patchMovies = (ids: string[], params: Record<string, any>) => {
  return request({
    url: '/api/movie',
    method: 'patch',
    data: {
      ids, params
    }
  })
}