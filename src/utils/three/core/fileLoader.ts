import * as THREE from 'three'
export const loadFile = (url: string):Promise<any> => {
  const fileLoader = new THREE.FileLoader()
  return new Promise((resolve, reject) => {
    fileLoader.load(
      url,
      (response) => {
        debugger
        const data =
          typeof response === 'string' ? JSON.parse(response) : response
        resolve(data)
      },
      (res) => {
        console.log(res)
      },
      (error) => {
        console.dir(error)
        reject(new Error('出错了'))
      },
    )
  })
}
export default loadFile
