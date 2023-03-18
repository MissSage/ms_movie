import request from '../../axios'
export const toggleMusicFavorite = (id: string) => {
  return request({
    url: '/api/musicfavorite/toggle',
    method: 'post',
    data: {
      musicId: id,
    },
  })
}
export const getMusicFavorite = (musicId: string) => {
  return request({
    url: '/api/musicfavorite',
    method: 'get',
    params: {
      musicId: musicId,
    },
  })
}
