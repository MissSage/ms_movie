/**
 * 引入指定路径的图片
 * @param name 相对于assets/images/所在文件路径， assets/images/${name}
 * @param base 默认
 * @returns
 */
export const getImageUrl = (name: string | URL) => {
  const href = new URL(`../assets/images/${name}`, import.meta.url)?.href
  return href
}

export const generateImageFromVideo = async (
  url: string,
  extraData?: any,
): Promise<{ dataURL: string; extraData?: any }> => {
  if (!url) {
    return Promise.reject(new Error('请传入视频地址'))
  }
  const scale = 1
  const video = document.createElement('video')
  video.setAttribute('crossOrigin', 'anonymous')
  video.setAttribute('src', url)
  video.setAttribute('preload', 'auto')
  return new Promise((resolve) => {
    video.addEventListener('loadeddata', function () {
      const canvas = document.createElement('canvas')
      const width = video.videoWidth * scale
      const height = video.videoHeight * scale
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d')?.drawImage(video, 0, 0, width, height) //绘制canvas
      const dataURL = canvas.toDataURL('image/png') //转换为base64
      resolve({ dataURL, extraData })
    })
  })
}
