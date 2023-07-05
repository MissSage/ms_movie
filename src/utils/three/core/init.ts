import camera from './camera'
import renderer from './renderer'
const init = (container: HTMLElement) => {
  // 更新摄像头
  camera.aspect = container.clientWidth / container.clientHeight
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix()

  // 监听屏幕大小改变的变化，设置渲染的尺寸
  window.addEventListener('resize', () => {
    //   console.log("resize");
    // 更新摄像头
    camera.aspect = container.clientWidth / container.clientHeight
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix()

    //   更新渲染器
    renderer.setSize(container.clientWidth, container.clientHeight)
    //   设置渲染器的像素比例
    renderer.setPixelRatio(window.devicePixelRatio)
  })
  return { camera, renderer }
}

export default init
