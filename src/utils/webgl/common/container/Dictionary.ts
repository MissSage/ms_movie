export class Dictionary<T> {
  public constructor(useES6Map = true) {
    if (useES6Map === true) {
      this._items = new Map<string, T>()
    } else {
      this._items = {}
    }
  }

  public get length(): number {
    return this._count
  }

  public contains(key: string): boolean {
    if (this._items instanceof Map) {
      return this._items.has(key)
    } else {
      return this._items[key] !== undefined
    }
  }

  public find(key: string): T | undefined {
    if (this._items instanceof Map) {
      return this._items.get(key)
    } else {
      return this._items[key]
    }
  }

  public insert(key: string, value: T): void {
    if (this._items instanceof Map) {
      this._items.set(key, value)
    } else {
      this._items[key] = value
    }
    this._count++
  }

  public remove(key: string): boolean {
    const ret: T | undefined = this.find(key)
    if (ret === undefined) {
      return false
    }
    if (this._items instanceof Map) {
      this._items.delete(key)
    } else {
      delete this._items[key]
    }
    this._count--
    return true
  }

  public get keys(): string[] {
    const keys: string[] = []
    if (this._items instanceof Map) {
      const keyArray = this._items.keys()
      for (const key of keyArray) {
        keys.push(key)
      }
    } else {
      for (const prop in this._items) {
        if (this._items.hasOwnProperty(prop)) {
          keys.push(prop)
        }
      }
    }
    return keys
  }

  public get values(): T[] {
    const values: T[] = []
    if (this._items instanceof Map) {
      // 一定要用of，否则出错
      const vArray = this._items.values()
      for (const value of vArray) {
        values.push(value)
      }
    } else {
      for (const prop in this._items) {
        if (this._items.hasOwnProperty(prop)) {
          values.push(this._items[prop])
        }
      }
    }
    return values
  }

  private _items: { [k: string]: T } | Map<string, T>
  private _count = 0
}
