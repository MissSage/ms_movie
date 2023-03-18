import request from '../../axios'
export * from './musicFavorite'
export * from './musicStarrings'
export const getMusics = (params?: IQueryParams) => {
  return request({
    url: '/api/music',
    method: 'get',
    params,
  })
}
export const postMusic = (params: any) => {
  return request({
    url: '/api/music',
    method: 'post',
    data: params,
  })
}

export const getMusic = (id: string) => {
  return request({
    url: '/api/music/' + id,
    method: 'get',
  })
}
export const editMusic = (id: string, params: any) => {
  return request({
    url: '/api/music/' + id,
    method: 'put',
    data: params,
  })
}
export const importMusics = (params: { path: string; replacePath: string; tags: string }) => {
  return request({
    url: '/api/music/import',
    method: 'post',
    data: params,
  })
}
export const removeMusics = (ids: string[]) => {
  return request({
    url: '/api/music',
    method: 'delete',
    data: { ids },
  })
}
export const patchMusics = (ids: string[], params: Record<string, any>) => {
  return request({
    url: '/api/music',
    method: 'patch',
    data: {
      ids,
      params,
    },
  })
}
/**
 * 上传图片base64生成图片并保存路径到对应视频数据
 * @param id 视频id
 * @param params {data：封面图片base64，rootPath: 要上传到哪个路径下（默认是：http://localhost/封面图/)}
 * @returns
 */
export const postMusicImg = (
  id: string,
  params: {
    data: string
    rootPath?: string
  },
) => {
  return request({
    url: '/api/music/imgs/' + id,
    method: 'post',
    data: params,
  })
}
