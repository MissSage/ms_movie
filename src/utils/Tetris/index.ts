import { Game } from './Game'
import { SHAPESTATUS } from './Shape'
export class Tetris extends Game {
  constructor(canvas: HTMLCanvasElement, rows?: number, columns?: number) {
    super(canvas, rows, columns)
  }
  private _requestId = -1
  private _timer = -1
  private _timeOut = -1
  private _isRunning = false
  private _render() {
    const that = this
    if (that === undefined) {
      return
    }
    this._setShapeColor()
    this._renderTable()
    this._requestId = requestAnimationFrame(this._render.bind(this))
  }

  down(toBottom?: boolean) {
    if (!this._isRunning) return
    // 判断是否可以继续下降
    if (this._currentShape?.status === SHAPESTATUS.MOVEABLE) {
      // 清除形状
      this._clearShape()
      // y+1然后重新绘制形状
      this._currentShape.y++
      this._currentShape.shape()
      // 否则绘制此次形状
      const notDown = this._notDown()
      if (notDown) {
        this._currentShape.y--
        this._currentShape.status = SHAPESTATUS.UNMOVEABLE
        this._currentShape.shape()
        this._drawShape()
        if (this._currentShape.y === 0) {
          this.stop()
          this._gameOver()
        } else {
          this._generateNewShape()
          this._resetDownTimer()
        }
      } else {
        this._drawShape()
        if (toBottom) {
          this._timeOut = setTimeout(() => {
            this.down(toBottom)
          }, 30)
        }
      }
    }
  }
  right() {
    if (!this._isRunning) return
    // 判断是否可以移动
    if (this._currentShape?.status === SHAPESTATUS.MOVEABLE) {
      // 清除形状
      this._clearShape()
      // y+1然后重新绘制形状
      this._currentShape.x++
      this._currentShape.shape()
      // 否则绘制此次形状
      const unMoveable = this._notMove()
      if (unMoveable) {
        this._currentShape.x--
      }
      this._drawShape()
    }
  }
  left() {
    if (!this._isRunning) return
    // 判断是否可以移动
    if (this._currentShape?.status === SHAPESTATUS.MOVEABLE) {
      // 清除形状
      this._clearShape()
      // y+1然后重新绘制形状
      this._currentShape.x--
      this._currentShape.shape()
      // 否则绘制此次形状
      const unMoveable = this._notMove()
      if (unMoveable) {
        this._currentShape.x++
      }
      this._drawShape()
    }
  }
  change() {
    if (!this._isRunning) return
    // 判断是否可以移动
    if (this._currentShape?.status === SHAPESTATUS.MOVEABLE) {
      // 清除形状
      this._clearShape()
      // y+1然后重新绘制形状
      this._currentShape.change(1)
      // 否则绘制此次形状
      const notChange = this._notMove()
      if (notChange) {
        this._currentShape.change(-1)
      }
      this._drawShape()
    }
  }
  private _resetDownTimer() {
    clearTimeout(this._timeOut)
    clearInterval(this._timer)
    this._timer = setInterval(() => {
      this.down()
    }, 1500 / this._level)
  }
  stop() {
    this._isRunning = false
    cancelAnimationFrame(this._requestId)
    clearInterval(this._timer)
  }
  togglePlay(flag?: boolean) {
    const _isRunning = flag ?? this._isRunning
    this.stop()
    if (_isRunning) {
      return
    }
    if (this._isEnd) {
      this._reset()
      this._generateNewShape()
    }
    this._isRunning = true
    this._resetDownTimer()
    this._render()
  }
  init() {
    this._reset()
    this._generateNewShape()
    document.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 's':
          clearTimeout(this._timeOut)
          break

        default:
          break
      }
    })
    document.addEventListener('keypress', (e) => {
      const key = e.key
      switch (key) {
        case ' ':
          this.togglePlay()
          break
        case 's':
          this.down(true)
          break
        case 'd':
          this.right()
          break
        case 'a':
          this.left()
          break
        case 'w':
          this.change()
          break
        case 'l':
          this.levelUp()
          break
        default:
          break
      }
    })
  }
}
