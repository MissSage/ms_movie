<template>
  <div></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import hit_iron from '@/assets/audios/hit_iron.mp3'

/********************************* 场景 */
const scene:THREE.Scene|undefined = inject('scene')
const group = new THREE.Object3D()
scene?.add(group)
const camera:THREE.Camera|undefined = inject('camera')
camera?.position.set(0, -4, 10)
/******************************* 光源 */
// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
group.add(ambientLight)

// 平行光
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
dirLight.castShadow = true
group.add(dirLight)

// 存储生成的方块
const cubeArr: { mesh: THREE.Mesh; body: CANNON.Body }[] = []

/************************************ 材质 */
// 设置方块材质
const cubeWorldMaterial = new CANNON.Material('cube')
const cubeMaterial = new THREE.MeshStandardMaterial()
// 设置地面材质
const floorWorldMaterial = new CANNON.Material('floor')
const floorMaterial = new THREE.MeshStandardMaterial()

// 设置地面与方块两种材质碰撞的物理参数
const defaultContactMaterial = new CANNON.ContactMaterial(cubeWorldMaterial, floorWorldMaterial, {
  friction: 0.1, //摩擦系数
  restitution: 0.7, // 弹性
})

/**
 * 生成方块
 */
const createCube = () => {
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.castShadow = true
  group.add(cube)

  // 创建物理方块
  const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
  const cubeBody = new CANNON.Body({
    shape: cubeShape,
    position: new CANNON.Vec3(0, 0, 0),
    // 方块质量,用于运量守恒计算
    mass: 1,
    material: cubeWorldMaterial,
  })
  // 对方块施加力
  cubeBody.applyLocalForce(
    // 施加的力的大小
    new CANNON.Vec3(300, 0, 0),
    // 施加的力的作用点
    new CANNON.Vec3(0, 0, 0),
  )
  // 将物理方块添加到物理世界
  world.addBody(cubeBody)

  cubeBody.addEventListener(CANNON.Body.COLLIDE_EVENT_NAME, hitEvent)
  cubeArr.push({ mesh: cube, body: cubeBody })
  return cubeBody
}
/**
 * 生成地面
 * @param y
 */
const createFloor = (y = -5) => {
  const floorGeometry = new THREE.PlaneGeometry(20, 20)
  const floor = new THREE.Mesh(floorGeometry, floorMaterial)
  floor.position.set(0, y, 0)
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  group.add(floor)

  // 物理世界创建地面
  const floorShape = new CANNON.Plane()
  const floorBody = new CANNON.Body()

  floorBody.material = floorWorldMaterial
  // 当质量为0时可以使物体保持不去
  floorBody.mass = 0
  floorBody.addShape(floorShape)
  // 设置地面位置
  floorBody.position.set(0, y, 0)
  // 旋转地面的位置
  floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
  world.addBody(floorBody)
  return floorBody
}
/**
 * 物理引擎碰撞事件
 * @param e
 */
const hitEvent = (e: any) => {
  // 获取碰撞强度
  const contact: CANNON.ContactEquation = e.contact
  const impactStength = contact.getImpactVelocityAlongNormal()
  // 处理播放声音阀值
  if (impactStength < 3) return
  // 创建击打声音
  const hitSound = new Audio(hit_iron)
  hitSound.currentTime = 0.6
  hitSound.volume = impactStength / 20
  hitSound.play()
}

/********************************* 创建物理世界 */
const world = new CANNON.World()
// 设置重力
world.gravity.set(0, -9.8, 0)

world.addContactMaterial(defaultContactMaterial)
// 设置世界默认的材料，如果材料没有设置，都用这个
world.defaultContactMaterial = defaultContactMaterial

/********************************* 动画 */
let requestId = -1
const clock = new THREE.Clock()
/**
 * 更新动画
 */
const run = () => {
  requestId = requestAnimationFrame(run)
  // let time = clock.getElapsedTime()
  let deltaTime = clock.getDelta()
  // 更新物理引擎里世界的物体
  world.step(1 / 120, deltaTime)
  // cubeArr.position.copy(cubeBody.position as any)
  cubeArr.forEach((item) => {
    item.mesh.position.copy(item.body.position as any)
    // 设置渲染的物体跟随物理物体旋转
    item.mesh.quaternion.copy(item.body.quaternion as any)
  })
}

const init = () => {
  run()
  createFloor()
  // 点击页面生成方块
  window.addEventListener('click', createCube)
}
onMounted(() => {
  init()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(requestId)
  window.removeEventListener('click', createCube)
  scene?.remove(group)
  group.clear()
  cubeMaterial.dispose()
  floorMaterial.dispose()
  ambientLight.dispose()
  dirLight.dispose()
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
}
</style>
