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
const bufferToAudio = (
  audioContext: AudioContext,
  arrayBuffer: any,
): Promise<AudioBuffer | null> => {
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
export class AudioWave {
  constructor(
    url: string,
    el: HTMLCanvasElement,
    properties?: {
      onended?: (e: Event) => any
    },
  ) {
    this._url = url
    this._el = el
    this._WIDTH = el.width
    this._HEIGHT = el.height
    properties?.onended && (this._onended = properties?.onended)
  }
  private _onended: ((e: Event) => any) | null = null
  private _url: string
  private _el: HTMLCanvasElement
  private _audioContext: AudioContext = new AudioContext()
  private _canvasCtx: CanvasRenderingContext2D | null = null
  private _analyser: AnalyserNode | undefined
  private _dataArray: Uint8Array = new Uint8Array()
  private _bufferLength = 0
  private _WIDTH = 0
  private _HEIGHT = 0
  private _color1: CanvasGradient | undefined
  private _color2: CanvasGradient | undefined
  private _drawID = 0
  private _audioBufferSourceNode: AudioBufferSourceNode | undefined = undefined
  async init() {
    // 创建音频播放节点
    this._audioBufferSourceNode = this._audioContext.createBufferSource()
    this._audioBufferSourceNode.connect(this._audioContext.destination) // 连接到AudioContext对象
    // 创建音频分析节点，连接音频分析器
    this._analyser = this._audioContext.createAnalyser()
    this._audioBufferSourceNode.connect(this._analyser)
    // 绑定事件
    this._audioBufferSourceNode.onended = this._onended
    // 单次数据的长度，只能是2的n次方
    this._analyser.fftSize = 256

    // 设置好fftSize之后可以拿到frequencyBinCount
    this._bufferLength = this._analyser.frequencyBinCount

    // 使用frequencyBinCount来创建一个Uint8Array，用于装数据
    this._dataArray = new Uint8Array(this._bufferLength)
    // 播放声音
    const arrayBuffer = await loadSound(this._url)
    const audioBuffer = await bufferToAudio(this._audioContext, arrayBuffer)
    this._audioBufferSourceNode.buffer = audioBuffer
    this._canvasCtx = this._el.getContext('2d')
    this._color1 = this._canvasCtx?.createLinearGradient(
      this._WIDTH / 2,
      this._HEIGHT / 2,
      this._WIDTH / 2,
      0,
    )
    this._color2 = this._canvasCtx?.createLinearGradient(
      this._WIDTH / 2,
      this._HEIGHT / 2,
      this._WIDTH / 2,
      this._HEIGHT,
    )
    this._color1?.addColorStop(0, '#1E90FF')
    this._color1?.addColorStop(0.25, '#FF7F50')
    this._color1?.addColorStop(0.5, '#8A2BE2')
    this._color1?.addColorStop(0.75, '#4169E1')
    this._color1?.addColorStop(1, '#00FFFF')
    this._color2?.addColorStop(0, '#1E90FF')
    this._color2?.addColorStop(0.25, '#FFD700')
    this._color2?.addColorStop(0.5, '#8A2BE2')
    this._color2?.addColorStop(0.75, '#4169E1')
    this._color2?.addColorStop(1, '#FF0000')
    this._audioBufferSourceNode.start()
    this._audioContext.suspend()
  }
  /**
   * 绘制柱状图
   * @returns void
   */
  private _draw() {
    const that = this
    if (that === undefined) return
    if (!that._canvasCtx || !that._el || !that._analyser) return
    that._drawID = requestAnimationFrame(that._draw.bind(this)) // 循环调用
    that._dataArray
    // 自定义获取数组里边数据的频步
    that._canvasCtx.clearRect(0, 0, that._WIDTH, that._HEIGHT)
    const sliceWidth = 12
    const barWdith = 2
    this._analyser?.getByteFrequencyData(this._dataArray) // 将当前数据填充在that._dataArray中
    for (let i = 0; i < that._bufferLength; i++) {
      const barHeight = that._dataArray[i]
      // 绘制向上的线条
      that._canvasCtx.fillStyle = that._color1 || 'rgb(0, 0, 0)'
      that._canvasCtx.fillRect(
        that._WIDTH / 2 + i * sliceWidth,
        that._HEIGHT / 2,
        barWdith,
        -barHeight,
      )
      that._canvasCtx.fillRect(
        that._WIDTH / 2 - i * sliceWidth,
        that._HEIGHT / 2,
        barWdith,
        -barHeight,
      )
      // 绘制向下的线条
      that._canvasCtx.fillStyle = that._color2 || 'rgb(0, 0, 0)'
      that._canvasCtx.fillRect(
        that._WIDTH / 2 + i * sliceWidth,
        that._HEIGHT / 2,
        barWdith,
        barHeight,
      )
      that._canvasCtx.fillRect(
        that._WIDTH / 2 - i * sliceWidth,
        that._HEIGHT / 2,
        barWdith,
        barHeight,
      )
    }
  }
  start() {
    this._audioContext.resume()
    this._draw()
  }
  async toggle(flag: boolean) {
    if (!flag) {
      await this._audioContext.suspend()
      cancelAnimationFrame(this._drawID)
    } else {
      await this._audioContext?.resume()
      this._draw()
    }
  }
  destroy() {
    cancelAnimationFrame(this._drawID)
    this._audioBufferSourceNode?.disconnect()
    this._audioBufferSourceNode = undefined
    this._audioContext.close()
  }
}
