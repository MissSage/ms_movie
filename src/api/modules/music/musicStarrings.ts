import request from '../../axios'
export const getMusicStarrings = (params?: IQueryParams) => {
  return request({
    url: '/api/musicstarrings',
    method: 'get',
    params,
  })
}
export const postMusicStarring = (params: any) => {
  return request({
    url: '/api/musicstarrings',
    method: 'post',
    data: { starrings: params },
  })
}

export const updateMusicStarring = (id: string, params: any) => {
  return request({
    url: '/api/musicstarrings/' + id,
    method: 'put',
    data: { starrings: params },
  })
}
