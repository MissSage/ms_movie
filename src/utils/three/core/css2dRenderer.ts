import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer'
const css2dRenderer  = new CSS2DRenderer()
css2dRenderer.domElement.style.position = 'absolute'
css2dRenderer.domElement.style.top = '0px'
css2dRenderer.domElement.style.pointerEvents = 'none'

export const createLableObj = (
  text: string,
  options: {
    longitude: number
    latitude: number
    height: number
    className?: string
  },
) => {
  const laberDiv = document.createElement('div') // 创建div容器
  laberDiv.className = options.className || ''
  laberDiv.innerHTML = text
  const pointLabel = new CSS2DObject(laberDiv)
  pointLabel.position.set(
    options.longitude,
    -options.latitude,
    options.height
  )
  return pointLabel
}

export default css2dRenderer