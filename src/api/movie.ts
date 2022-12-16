import request from "./axios"
export const getMovies = (params: any) => {
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
