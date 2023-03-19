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
    /**
     * canvas元素
     */
    el: HTMLCanvasElement,
    properties?: {
      /**
       * 播放结束的回调
       * @param e
       * @returns
       */
      onEnded?: (e: Event) => any
      /**
       * 指定柱状图的渐变色
       */
      colorStops?: {
        /**
         * colorstop,从0-1的数字
         */
        colorStop: number
        /**
         * 颜色
         */
        color: string
      }[]
    },
  ) {
    this._el = el
    properties?.colorStops && (this._colorStops = properties?.colorStops)
    this._onEnded = properties?.onEnded
    this._audioContext = new AudioContext()
    // 创建音频分析节点，连接音频分析器
    this._analyser = this._audioContext.createAnalyser()
    // 单次数据的长度，只能是2的n次方
    this._analyser.fftSize = 2048

    // 设置好fftSize之后可以拿到frequencyBinCount
    this._bufferLength = this._analyser.frequencyBinCount

    // 使用frequencyBinCount来创建一个Uint8Array，用于装数据
    this._dataArray = new Uint8Array(this._bufferLength)
  }
  /**
   * 当前canvas元素
   */
  private _el: HTMLCanvasElement
  /**
   * 音频接口上下文
   */
  private _audioContext: AudioContext
  /**
   * 当前canvas的上下文
   */
  private _canvasCtx: CanvasRenderingContext2D | null = null
  /**
   * 音乐分析器，通过getByteFrequencyData方法给传的数据填充数据，用来获取柱状图所需的数组
   */
  private _analyser: AnalyserNode
  /**
   * 当前帧用于绘制柱状图的数据
   */
  private _dataArray: Uint8Array
  /**
   * buffer长度
   */
  private _bufferLength = 0
  /**
   * canvas的width属性
   */
  private _WIDTH = 0
  /**
   * canvas的height属性
   */
  private _HEIGHT = 0
  /**
   * 柱状图的渐变色
   */
  private _color1: CanvasGradient | undefined
  /**
   * 当前帧id
   */
  private _drawID = 0
  /**
   * 经过推算的当前歌曲的起始点时间
   */
  private _startTime = 0
  /**
   * 播放速度,默认1
   */
  private _rate = 1
  /**
   * 音频的时长
   */
  public duration = 0
  /**
   * 已播放时长
   */
  public currentTime = 0
  /**
   * 缓存的当前整首歌的buffer数据
   */
  public _chchedBuffer: AudioBuffer | null = null
  /**
   * 播放结束的回调
   */
  private _onEnded?: (...args: any[]) => any
  /**
   * 音频源节点，是本功能的核心，作用：连接终端、连接音频分析器、控制播放速度、播放进度
   */
  private _audioBufferSourceNode?: AudioBufferSourceNode
  /**
   * 颜色渐变节点
   */
  private _colorStops: { colorStop: number; color: string }[] = [
    { colorStop: 0, color: '#1E90FF' },
    { colorStop: 0.25, color: '#FF7F50' },
    { colorStop: 0.5, color: '#8A2BE2' },
    { colorStop: 0.75, color: '#4169E1' },
    { colorStop: 1, color: '#00FFFF' },
  ]
  /**
   * 配置柱状图渐变色
   * @param _canvasCtx 当前canvas上下文
   */
  private _setColors(_canvasCtx: CanvasRenderingContext2D | null) {
    this._color1 = _canvasCtx?.createLinearGradient(0, this._HEIGHT, 0, 0)
    this._colorStops.map((item) => {
      this._color1?.addColorStop(item.colorStop, item.color)
    })
    // this._color1?.addColorStop(0, '#1E90FF')
    // this._color1?.addColorStop(0.25, '#FF7F50')
    // this._color1?.addColorStop(0.5, '#8A2BE2')
    // this._color1?.addColorStop(0.75, '#4169E1')
    // this._color1?.addColorStop(1, '#00FFFF')
  }
  async init(url: string, offset = 0) {
    this._recordTime(offset)
    this._initCanves()
    await this._initBuffer(url)
    this._initAudioBufferSourceNode()
  }
  /**
   * 记录歌曲开始的时间
   * @param offset
   */
  private _recordTime(offset = 0) {
    this.currentTime = offset
    this._startTime = this._audioContext.currentTime - offset
  }
  /**
   * 整理canvas相关的信息
   */
  private _initCanves() {
    this._el.width = this._el.clientWidth
    this._el.height = this._el.clientHeight
    this._WIDTH = this._el.width
    this._HEIGHT = this._el.height
    this._canvasCtx = this._el.getContext('2d')
    this._setColors(this._canvasCtx)
  }
  /**
   * 获取buffer数据，不改变this.url则不用重复调用
   * @param url
   */
  private async _initBuffer(url: string) {
    // 播放声音
    const arrayBuffer = await loadSound(url)
    const audioBuffer = await bufferToAudio(this._audioContext, arrayBuffer)
    this._chchedBuffer = audioBuffer
    this.duration = audioBuffer?.duration || 0
  }
  /**
   * 生成AudioBufferSourceNode，需要先获取buffer数据
   */
  private _initAudioBufferSourceNode(offset = 0) {
    // 清除旧的AudioBufferSourceNode
    if (this._audioBufferSourceNode) {
      this._audioBufferSourceNode.buffer = null
      this._audioBufferSourceNode.disconnect(this._analyser)
    }
    // 创建音频播放节点
    this._audioBufferSourceNode = this._audioContext.createBufferSource()
    this._audioBufferSourceNode.connect(this._audioContext.destination) // 连接到AudioContext对象
    this._audioBufferSourceNode.connect(this._analyser)
    // 绑定事件
    this._onEnded && (this._audioBufferSourceNode.onended = this._onEnded)
    this._audioBufferSourceNode.buffer = this._chchedBuffer
    this._audioBufferSourceNode.playbackRate.value = this._rate
    this._audioBufferSourceNode?.start(0, offset)
  }
  /**
   * 设置播放进度
   * @param offset
   */
  setProgress(offset: number) {
    this._recordTime(offset)
    this._initAudioBufferSourceNode(offset)
  }
  /**
   * 设置播放速度默认1
   * @param rate
   * @returns
   */
  setRate(rate = 1) {
    this._rate = rate
    if (!this._audioBufferSourceNode) return
    this._audioBufferSourceNode.playbackRate.value = rate
  }
  /**
   * 绘制柱状图
   * @returns void
   */
  private _draw() {
    const deltaTime = this._audioContext.currentTime - this._startTime - this.currentTime
    const ratedDelta = deltaTime * this._rate
    const curTime = this.currentTime + ratedDelta
    this._recordTime(curTime)
    const that = this
    if (that === undefined) return
    if (!that._canvasCtx || !that._el || !that._analyser) return
    that._drawID = requestAnimationFrame(that._draw.bind(this)) // 循环调用
    that._dataArray
    // 自定义获取数组里边数据的频步
    that._canvasCtx.clearRect(0, 0, that._WIDTH, that._HEIGHT)
    const sliceWidth = 6
    const barWdith = 2
    this._analyser?.getByteFrequencyData(this._dataArray) // 将当前数据填充在that._dataArray中
    for (let i = 0; i < that._bufferLength; i++) {
      const barHeight = that._dataArray[i]
      // 绘制向上的线条
      that._canvasCtx.fillStyle = that._color1 || 'rgb(0, 0, 0)'
      that._canvasCtx.fillRect(i * sliceWidth, that._HEIGHT, barWdith, -barHeight)
    }
  }
  /**
   * 暂停/播放
   * @param flag
   */
  async toggle(flag: boolean) {
    await this._audioContext.suspend()
    cancelAnimationFrame(this._drawID)
    if (flag) {
      await this._audioContext?.resume()
      this._draw()
    }
  }
  /**
   * 释放
   */
  destroy() {
    cancelAnimationFrame(this._drawID)
    if (this._audioBufferSourceNode) {
      this._audioBufferSourceNode.buffer = null
      this._audioBufferSourceNode.disconnect(this._analyser)
      this._audioContext.close()
    }
  }
}
