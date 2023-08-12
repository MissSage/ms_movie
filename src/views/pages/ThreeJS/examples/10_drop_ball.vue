<template>
  <div></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import hit_iron from '@/assets/audios/hit_iron.mp3'

const scene: THREE.Scene | undefined = inject('scene')
const group = new THREE.Object3D()
scene?.add(group)
const camera: THREE.Camera | undefined = inject('camera')
camera?.position.set(0, -4, 10)

// 球
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const sphereMaterial = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.castShadow = true
group?.add(sphere)

// 平面
const floorGeometry = new THREE.PlaneGeometry(20, 20)
const floorMaterial = new THREE.MeshStandardMaterial()
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.position.set(0, -5, 0)
floor.rotation.x = -Math.PI / 2
floor.receiveShadow = true
group.add(floor)

// 创建物理世界
const world = new CANNON.World()
// 设置重力
world.gravity.set(0, -9.8, 0)

// 设置物体材质
const sphereWorldMaterial = new CANNON.Material('sphere')
// 创建物理小球
const sphereShape = new CANNON.Sphere(1)
const sphereBody = new CANNON.Body({
  shape: sphereShape,
  position: new CANNON.Vec3(0, 0, 0),
  // 小球质量,用于运量守恒计算
  mass: 1,
  material: sphereWorldMaterial,
})
// 将物理小球添加到物理世界
world.addBody(sphereBody)

// 添加物理引擎碰撞事件
const hitEvent = (e: any) => {
  // 获取碰撞强度
  const contact: CANNON.ContactEquation = e.contact
  const impactStength = contact.getImpactVelocityAlongNormal()
  // 处理播放声音阀值
  if (impactStength < 0.5) return
  // 创建击打声音
  const hitSound = new Audio(hit_iron)
  hitSound.currentTime = 0.4
  hitSound.volume = impactStength / 20
  hitSound.play()
}
sphereBody.addEventListener(CANNON.Body.COLLIDE_EVENT_NAME, hitEvent)
// 物理世界创建地面
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
// 设置地面材质
const floorWorldMaterial = new CANNON.Material('floor')
floorBody.material = floorWorldMaterial
// 当质量为0时可以使物体保持不去
floorBody.mass = 0
floorBody.addShape(floorShape)
// 设置地面位置
floorBody.position.set(0, -5, 0)
// 旋转地面的位置
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
world.addBody(floorBody)

// 设置地面与小球两种材质碰撞的物理参数
const defaultContactMaterial = new CANNON.ContactMaterial(
  sphereWorldMaterial,
  floorWorldMaterial,
  {
    friction: 0.1, //摩擦系数
    restitution: 0.7, // 弹性
  },
)
world.addContactMaterial(defaultContactMaterial)
// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
group.add(ambientLight)

// 平行光
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
dirLight.castShadow = true
group.add(dirLight)


// 更新动画
let requestId = -1
const clock = new THREE.Clock()
const run = () => {
  requestId = requestAnimationFrame(run)
  // let time = clock.getElapsedTime()
  let deltaTime = clock.getDelta()
  // 更新物理引擎里世界的物体
  world.step(1 / 120, deltaTime)
  sphere.position.copy(sphereBody.position as any)
}

onMounted(() => {
  run()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(requestId)
  scene?.remove(group)
  group.clear()
  sphereMaterial.dispose()
  sphereGeometry.dispose()
  floorGeometry.dispose()
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
