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