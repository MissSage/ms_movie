export const useAudioWave = () => {
  // 兼容
  const audioContext = new AudioContext()
  // 创建音频播放节点
  const audioBufferSourceNode = audioContext.createBufferSource()
  audioBufferSourceNode.connect(audioContext.destination) // 连接到AudioContext对象
  // 创建音频分析节点，连接音频分析器
  const analyser = audioContext.createAnalyser()
  audioBufferSourceNode.connect(analyser)

  // 单次数据的长度，只能是2的n次方
  analyser.fftSize = 2048

  // 设置好fftSize之后可以拿到frequencyBinCount
  const bufferLength = analyser.frequencyBinCount

  // 使用frequencyBinCount来创建一个Uint8Array，用于装数据
  const dataArray = new Uint8Array(bufferLength)
  // 通过analyser.getByteTimeDomainData可以将当前数据填充在dataArray中
  analyser.getByteTimeDomainData(dataArray)
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
  let canvas: HTMLCanvasElement | undefined = undefined
  let canvasCtx: CanvasRenderingContext2D | null = null
  const init = async (url: string, el?: HTMLCanvasElement) => {
    // 播放声音
    const arrayBuffer = await loadSound(url)
    const audioBuffer = await bufferToAudio(arrayBuffer)
    audioBufferSourceNode.buffer = audioBuffer

    // 显示音浪
    if (!el) return
    canvas = el
    canvasCtx = canvas.getContext('2d')
    draw()
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
  function draw() {
    if (!canvasCtx || !canvas) return
    requestAnimationFrame(draw) // 循环调用
    analyser.getByteTimeDomainData(dataArray) // 将当前数据填充在dataArray中

    canvasCtx.fillStyle = 'rgb(200, 200, 200)'
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height)
    canvasCtx.lineWidth = 2
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)'
    canvasCtx.beginPath()

    const sliceWidth = (canvas.width * 1.0) / bufferLength
    let x = 0

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0
      const y = (v * canvas.height) / 2

      if (i === 0) {
        canvasCtx.moveTo(x, y)
      } else {
        canvasCtx.lineTo(x, y)
      }

      x += sliceWidth
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2)
    canvasCtx.stroke()
  }
  return {
    init,
    toggle,
    isStart,
  }
}
