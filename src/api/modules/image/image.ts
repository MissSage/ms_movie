import request from '../../axios'
export const getImages = (params?: IQueryParams) => {
  return request({
    url: '/api/image',
    method: 'get',
    params,
  })
}
export const postImage = (params: any) => {
  return request({
    url: '/api/image',
    method: 'post',
    data: params,
  })
}

export const getImage = (id: string) => {
  return request({
    url: '/api/image/' + id,
    method: 'get',
  })
}
export const editImage = (id: string, params: any) => {
  return request({
    url: '/api/image/' + id,
    method: 'put',
    data: params,
  })
}
export const importImages = (params: { path: string; replacePath: string; tags: string }) => {
  return request({
    url: '/api/image/import',
    method: 'post',
    data: params,
  })
}
export const removeImages = (ids: string[]) => {
  return request({
    url: '/api/image',
    method: 'delete',
    data: { ids },
  })
}
export const patchImages = (ids: string[], params: Record<string, any>) => {
  return request({
    url: '/api/image',
    method: 'patch',
    data: {
      ids,
      params,
    },
  })
}
