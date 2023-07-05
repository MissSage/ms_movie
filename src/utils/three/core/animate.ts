import * as THREE from 'three'
import camera from './camera'
import renderer from './renderer'
import controls from './controls'
import scene from './scene'
import css2dRenderer from './css2dRenderer'
const clock = new THREE.Clock()
function animate() {
  controls.update()
  clock.getElapsedTime()
  requestAnimationFrame(animate)
  // 使用渲染器渲染相机看这个场景的内容渲染出来
  renderer.render(scene, camera)
  css2dRenderer.render(scene,camera)
}

export default animate
