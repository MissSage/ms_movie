import request from './axios'
export const getPictures = (params: any) => {
  return request({
    url: '/api/picture',
    method: 'get',
    params
  })
}