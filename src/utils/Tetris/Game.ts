import {
  SHAPESTATUS,
  Shape,
  SHAPES,
  ShapeB,
  ShapeL,
  ShapeLR,
  ShapeI,
  ShapeW,
  ShapeZ,
  ShapeZR,
} from './Shape'

export abstract class Game {
  /**
   * 游戏布局需要
   * @param canvas
   * @param blockSize
   */
  constructor(canvas: HTMLCanvasElement, rows = 20, columns = 12) {
    this._canvas = canvas
    this._canvasCTX = this._canvas.getContext('2d')
    this._WIDTH = canvas.width
    this._HEIGHT = canvas.height
    this._tableWidth = this._WIDTH * 0.6
    this._rows = rows
    this._columns = columns
    this._blockSize = this._tableWidth / columns
    this._tableHeight = this._blockSize * rows
    this._textLeft = this._WIDTH * 0.65
    this._reset()
  }
  private _canvas: HTMLCanvasElement
  private _canvasCTX: CanvasRenderingContext2D | null
  protected _arr: number[][] = []
  private _WIDTH
  private _HEIGHT
  protected _rows
  protected _columns
  protected _currentShape: Shape | undefined
  /**
   * 格子大小
   */
  protected _blockSize
  private _tableWidth
  private _tableHeight
  /**
   * 右侧文本的x
   */
  private _textLeft
  /**
   * 当前最高分
   */
  private _score = 0
  /**
   * 当前等级
   */
  protected _level = 1
  protected _isEnd = true
  /**
   * 当前得分
   */
  private _point = 0
  public rules = ['w：旋转', 's：下降', 'a：向左', 'd：向右', 'l：设置等级']
  resize() {
    this._WIDTH = this._canvas.width
  }
  private _renderBar() {
    if (!this._canvasCTX) return
    const ctx = this._canvasCTX
    ctx.clearRect(this._textLeft, 0, this._WIDTH - this._textLeft, this._HEIGHT)
    let posY = 32
    let height = 32
    ctx.font = '32px 黑体'
    ctx.fillStyle = '#07c160'
    ctx.fillText(`最高分：${this._score}`, this._textLeft, posY)
    posY += height
    height = 32
    ctx.fillStyle = '#07c160'
    ctx.font = '24px 黑体'
    ctx.fillText(`当前得分：${this._point}`, this._textLeft, posY)
    posY += height
    height = 32
    ctx.fillStyle = '#07c160'
    ctx.font = '24px 黑体'
    ctx.fillText(`当前等级：${this._level}`, this._textLeft, posY)
    posY += height
    height = 300
    ctx.font = '20px 黑体'
    ctx.fillStyle = '#07c160'

    this.rules.map((item) => {
      posY += 32
      ctx.fillText(item, this._textLeft, posY)
    })
  }
  protected _gameOver() {
    if (!this._canvasCTX) return
    const ctx = this._canvasCTX
    const posX = this._tableWidth / 2 - 40
    const posY = this._tableHeight / 2 - 20
    ctx.font = '32px 黑体'
    ctx.fillStyle = '#07c160'
    ctx.fillText('Game Over!', posX, posY)
    this._isEnd = true
  }
  levelUp() {
    this._level = ++this._level % 10
    this._renderBar()
  }
  protected _renderTable() {
    if (!this._canvasCTX) return
    const ctx = this._canvasCTX
    ctx.clearRect(0, 0, this._tableWidth, this._tableHeight)
    this._arr.map((row, i) => {
      row.map((col, j) => {
        ctx.strokeStyle = '#000' //设置边框颜色
        ctx.lineWidth = 1 //设置边框宽度
        ctx.strokeRect(
          this._blockSize * j + 2,
          this._blockSize * i + 2,
          this._blockSize - 4,
          this._blockSize - 4,
        ) //绘制矩形边框 strokeRect(x,y,width,height)
        //填充矩形形状
        ctx.fillStyle = col === SHAPESTATUS.NONE ? '#ccc' : '#4e4e4e' //设置填充颜色
        ctx.fillRect(
          this._blockSize * j + 2,
          this._blockSize * i + 2,
          this._blockSize - 4,
          this._blockSize - 4,
        )
      })
    })
  }
  protected _setShapeColor(errorCallBack?: () => void) {
    if (!this._currentShape) return
    const arr = this._currentShape.shapeIndexs
    const status = this._currentShape.status
    try {
      arr.map((indexs) => {
        this._arr[indexs[0]][indexs[1]] = status
      })
    } catch (error) {
      errorCallBack?.()
    }
  }
  protected _generateNewShape() {
    this._generateShape(Math.floor(this._columns / 2), 0, Math.floor(Math.random() * 7))
  }
  protected _clearShape() {
    if (!this._currentShape) return
    const status = this._currentShape.status
    this._currentShape.status = SHAPESTATUS.NONE
    this._setShapeColor()
    this._currentShape.status = status
  }
  protected _drawShape() {
    if (!this._currentShape) return
    this._currentShape.shape()
    this._setShapeColor()
  }
  protected _reset() {
    this._isEnd = false
    // 给数组赋值0
    this._arr = Array.from({ length: this._rows }).map(() => {
      const cArr = Array.from({ length: this._columns }).map(() => SHAPESTATUS.NONE)
      return cArr
    })
    this._renderTable()
    this._renderBar()
  }
  protected _generateShape(x: number, y: number, shapeType: number) {
    switch (shapeType) {
      case SHAPES.B:
        this._currentShape = new ShapeB(x, y)
        break
      case SHAPES.L:
        this._currentShape = new ShapeL(x, y)
        break
      case SHAPES.LR:
        this._currentShape = new ShapeLR(x, y)
        break
      case SHAPES.I:
        this._currentShape = new ShapeI(x, y)
        break
      case SHAPES.W:
        this._currentShape = new ShapeW(x, y)
        break
      case SHAPES.Z:
        this._currentShape = new ShapeZ(x, y)
        break
      case SHAPES.ZR:
        this._currentShape = new ShapeZR(x, y)
      default:
        break
    }
    this._currentShape?.shape()
  }
  protected _notDown = () => {
    if (!this._currentShape) return true
    const indexs = this._currentShape.shapeIndexs
    try {
      return indexs.some((item) => {
        // 只要有一个不为NONE状态，由表示发生了重叠，需要回退一格
        return this._arr[item[0]][item[1]] === SHAPESTATUS.UNMOVEABLE
      })
    } catch (error) {
      return true
    }
  }
  protected _notMove = () => {
    if (!this._currentShape) return true
    const indexs = this._currentShape.shapeIndexs
    try {
      return indexs.some((item) => {
        // 边界判断
        const hasUnMovable = this._arr[item[0]][item[1]] === SHAPESTATUS.UNMOVEABLE
        return item[0] >= this._rows || item[1] >= this._columns || item[1] < 0 || hasUnMovable
      })
    } catch (error) {
      return true
    }
  }
}
