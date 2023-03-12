export const useAudioWave = () => {
  // 兼容
  const audioContext = new AudioContext()

  // 创建音频播放节点
  const audioBufferSourceNode = audioContext.createBufferSource()
  audioBufferSourceNode.connect(audioContext.destination) // 连接到AudioContext对象

  // 加载音频文件
  const loadSound = (url: string) => {
    return new Promise((resolve) => {
      const request = new XMLHttpRequest() //建立一个请求
      request.open('GET', url, true) //配置好请求类型，文件路径等
      request.responseType = 'arraybuffer' //配置数据返回类型
      // 一旦获取完成，对音频进行进一步操作，比如解码
      request.onload = () => {
        resolve(request.response)
      }
      request.send()
    })
  }
  /**
   * ArrayBuffer 转 AudioBuffer
   * @param arrayBuffer
   * @returns {Promise}
   */
  const bufferToAudio = (arrayBuffer: any): Promise<AudioBuffer | null> => {
    return new Promise((resolve, reject) => {
      audioContext.decodeAudioData(
        arrayBuffer,
        (res) => {
          resolve(res)
        },
        (err) => {
          reject(err)
        },
      )
    })
  }
  const isStart = ref<boolean>(false)
  const init = async (url: string) => {
    const arrayBuffer = await loadSound(url)
    const audioBuffer = await bufferToAudio(arrayBuffer)
    audioBufferSourceNode.buffer = audioBuffer
  }
  const toggle = (flag?: boolean) => {
    if (flag !== undefined) {
      isStart.value = flag
    } else {
      isStart.value = !isStart.value
    }
    if (isStart.value) {
      audioBufferSourceNode.start()
    } else {
      audioBufferSourceNode.stop()
    }
  }
  return {
    init,
    toggle,
    isStart,
  }
}
