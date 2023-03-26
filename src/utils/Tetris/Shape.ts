export enum SHAPESTATUS {
  NONE,
  MOVEABLE,
  UNMOVEABLE,
}
export enum SHAPEDIRECTION {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}
export enum SHAPES {
  L,
  LR,
  B,
  I,
  W,
  Z,
  ZR,
}
/**
 * 总共有7种形状
 * L形（L）,反L形（LR）,正方形（B）,条形（I）,山形（W）,Z形（Z）,反Z形（ZR）
 */
export abstract class Shape {
  /**
   * 创建一个形状
   * @param x
   * @param y
   */
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  x = 0
  y = 0
  shapeIndexs: number[][] = []
  /**
   * 方向，0： 初始方向， 每加一顺时针旋转90度
   */
  direction = SHAPEDIRECTION.TOP
  /**
   * 渲染状态
   * status 渲染状态 0: 不显示 1：可移动 2：不可移动
   */
  status = 1
  /**
   * 设置形状的方法
   * 每一个不同的方块类型都是由4个格子组成，将其中的一个格子视为原点，其余3个格子相对它来定位
   * @param inputArr 用于渲染游戏布局格子的数组，二维， 宽x长
   */
  abstract shape(): void
  change(flag: 1 | -1) {
    const direction = this.direction + flag
    this.direction = direction < 0 ? direction + 4 : direction % 4
    // 新形状
    this.shape()
  }
}
export class ShapeL extends Shape {
  /**
   * L形
   * @param x
   * @param y
   */
  constructor(x: number, y: number) {
    super(x, y)
  }
  shape() {
    switch (this.direction) {
      case SHAPEDIRECTION.TOP:
        this.shapeIndexs = [
          [this.y + 1, this.x - 1],
          [this.y, this.x - 1],
          [this.y, this.x],
          [this.y, this.x + 1],
        ]
        break
      case SHAPEDIRECTION.RIGHT:
        this.shapeIndexs = [
          [this.y - 1, this.x],
          [this.y - 1, this.x + 1],
          [this.y, this.x + 1],
          [this.y + 1, this.x + 1],
        ]
        break
      case SHAPEDIRECTION.BOTTOM:
        this.shapeIndexs = [
          [this.y, this.x + 1],
          [this.y + 1, this.x + 1],
          [this.y + 1, this.x],
          [this.y + 1, this.x - 1],
        ]
        break
      case SHAPEDIRECTION.LEFT:
        this.shapeIndexs = [
          [this.y - 1, this.x - 1],
          [this.y, this.x - 1],
          [this.y + 1, this.x - 1],
          [this.y + 1, this.x],
        ]
        break
      default:
        break
    }
  }
}
export class ShapeLR extends Shape {
  /**
   * 反L形
   * @param x
   * @param y
   */
  constructor(x: number, y: number) {
    super(x, y)
  }
  shape() {
    switch (this.direction) {
      case SHAPEDIRECTION.TOP:
        this.shapeIndexs = [
          [this.y, this.x],
          [this.y, this.x - 1],
          [this.y, this.x + 1],
          [this.y + 1, this.x + 1],
        ]
        break
      case SHAPEDIRECTION.RIGHT:
        this.shapeIndexs = [
          [this.y, this.x + 1],
          [this.y - 1, this.x + 1],
          [this.y + 1, this.x + 1],
          [this.y + 1, this.x],
        ]
        break
      case SHAPEDIRECTION.BOTTOM:
        this.shapeIndexs = [
          [this.y, this.x - 1],
          [this.y + 1, this.x - 1],
          [this.y + 1, this.x],
          [this.y + 1, this.x + 1],
        ]
        break
      case SHAPEDIRECTION.LEFT:
        this.shapeIndexs = [
          [this.y - 1, this.x],
          [this.y - 1, this.x - 1],
          [this.y, this.x - 1],
          [this.y + 1, this.x - 1],
        ]
        break
      default:
        break
    }
  }
}
export class ShapeB extends Shape {
  /**
   * 正方形
   * @param x
   * @param y
   */
  constructor(x: number, y: number) {
    super(x, y)
  }
  shape() {
    this.shapeIndexs = [
      [this.y, this.x],
      [this.y, this.x + 1],
      [this.y + 1, this.x],
      [this.y + 1, this.x + 1],
    ]
  }
}

export class ShapeI extends Shape {
  /**
   * 条形
   * @param x
   * @param y
   */
  constructor(x: number, y: number) {
    super(x, y)
  }
  shape() {
    switch (this.direction) {
      case SHAPEDIRECTION.TOP:
      case SHAPEDIRECTION.BOTTOM:
        this.shapeIndexs = [
          [this.y - 1, this.x],
          [this.y, this.x],
          [this.y + 1, this.x],
          [this.y + 2, this.x],
        ]
        break
      case SHAPEDIRECTION.LEFT:
      case SHAPEDIRECTION.RIGHT:
        this.shapeIndexs = [
          [this.y, this.x - 1],
          [this.y, this.x],
          [this.y, this.x + 1],
          [this.y, this.x + 2],
        ]
        break
      default:
        break
    }
  }
}
export class ShapeZ extends Shape {
  /**
   * Z形
   * @param x
   * @param y
   */
  constructor(x: number, y: number) {
    super(x, y)
  }
  shape() {
    switch (this.direction) {
      case SHAPEDIRECTION.TOP:
      case SHAPEDIRECTION.BOTTOM:
        this.shapeIndexs = [
          [this.y, this.x - 1],
          [this.y, this.x],
          [this.y + 1, this.x],
          [this.y + 1, this.x + 1],
        ]
        break
      case SHAPEDIRECTION.LEFT:
      case SHAPEDIRECTION.RIGHT:
        this.shapeIndexs = [
          [this.y - 1, this.x + 1],
          [this.y, this.x + 1],
          [this.y, this.x],
          [this.y + 1, this.x],
        ]
        break
      default:
        break
    }
  }
}
export class ShapeZR extends Shape {
  /**
   * 反Z形
   * @param x
   * @param y
   */
  constructor(x: number, y: number) {
    super(x, y)
  }
  shape() {
    switch (this.direction) {
      case SHAPEDIRECTION.TOP:
      case SHAPEDIRECTION.BOTTOM:
        this.shapeIndexs = [
          [this.y, this.x + 1],
          [this.y, this.x],
          [this.y + 1, this.x],
          [this.y + 1, this.x - 1],
        ]
        break
      case SHAPEDIRECTION.LEFT:
      case SHAPEDIRECTION.RIGHT:
        this.shapeIndexs = [
          [this.y - 1, this.x],
          [this.y, this.x],
          [this.y, this.x + 1],
          [this.y + 1, this.x + 1],
        ]
        break
      default:
        break
    }
  }
}
export class ShapeW extends Shape {
  /**
   * 山形
   * @param x
   * @param y
   */
  constructor(x: number, y: number) {
    super(x, y)
  }
  shape() {
    switch (this.direction) {
      case SHAPEDIRECTION.TOP:
        this.shapeIndexs = [
          [this.y, this.x],
          [this.y + 1, this.x - 1],
          [this.y + 1, this.x],
          [this.y + 1, this.x + 1],
        ]
        break
      case SHAPEDIRECTION.RIGHT:
        this.shapeIndexs = [
          [this.y - 1, this.x - 1],
          [this.y, this.x - 1],
          [this.y + 1, this.x - 1],
          [this.y, this.x],
        ]
        break
      case SHAPEDIRECTION.BOTTOM:
        this.shapeIndexs = [
          [this.y, this.x - 1],
          [this.y, this.x],
          [this.y, this.x + 1],
          [this.y + 1, this.x],
        ]
        break
      case SHAPEDIRECTION.LEFT:
        this.shapeIndexs = [
          [this.y - 1, this.x + 1],
          [this.y, this.x + 1],
          [this.y + 1, this.x + 1],
          [this.y, this.x],
        ]
        break
      default:
        break
    }
  }
}
