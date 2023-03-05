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
/**
 * 上传图片base64生成图片并保存路径到对应视频数据
 * @param id 视频id
 * @param params {data：封面图片base64，rootPath: 要上传到哪个路径下（默认是：http://localhost/封面图/)}
 * @returns 
 */
export const postMovieImg = (id: string, params: {
  data: string
  rootPath?: string
}) => {
  return request({
    url: '/api/movie/imgs/' + id,
    method: 'post',
    data: params
  })
}