// 有时我们在完成时需要按名称查询对应的HTMLImageElement对象
// 此时就需要ImageInfo结构了
export class ImageInfo {
  public name: string
  public image: HTMLImageElement

  public constructor(path: string, image: HTMLImageElement) {
    this.name = path
    this.image = image
  }
}

export class HttpRequest {
  //这个函数要起作用，必须要在tsconfig.json中将default的es5改成ES2015
  public static loadImageAsync(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject): void => {
      const image = new Image()

      image.onload = function () {
        resolve(image)
      }

      image.onerror = function () {
        reject(new Error('Could not load image at ' + url))
      }

      image.src = url
    })
  }

  //这个函数要起作用，必须要在tsconfig.json中将default的es5改成ES2015
  public static loadImageAsyncSafe(url: string, name: string = url): Promise<ImageInfo | null> {
    return new Promise((resolve, reject): void => {
      const image: HTMLImageElement = new Image()
      image.onload = function () {
        const info: ImageInfo = new ImageInfo(name, image)
        resolve(info)
      }

      image.onerror = function () {
        // resolve(null)
        reject(new Error('未能加载：' + url))
      }

      image.src = url
    })
  }

  public static loadTextFileAsync(url: string): Promise<string> {
    return new Promise((resolve, reject): void => {
      const xhr: XMLHttpRequest = new XMLHttpRequest()
      xhr.onreadystatechange = (): any => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(xhr.responseText)
        }
      }
      xhr.onprogress = function () {
        console.log('LOADING', xhr.status)
      }
      xhr.onload = function () {
        console.log('DONE', xhr.status)
      }
      xhr.onerror = () => {
        reject(new Error('未能加载：' + url))
      }
      xhr.open('get', url, true, null, null)
      xhr.send()
    })
  }

  public static loadArrayBufferAsync(url: string): Promise<ArrayBuffer> {
    return new Promise((resolve, reject): void => {
      const xhr: XMLHttpRequest = new XMLHttpRequest()
      xhr.responseType = 'arraybuffer'
      xhr.onreadystatechange = (): any => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(xhr.response as ArrayBuffer)
        }
      }
      xhr.onerror = () => {
        reject(new Error('未能加载：' + url))
      }
      xhr.open('get', url, true, null, null)
      xhr.send()
    })
  }
}
