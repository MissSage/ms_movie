<template>
  <div ref="refDiv" class="viewDiv"></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from '@three-ts/orbit-controls'
import * as d3 from 'd3'
// import gsap from 'gsap'
import linePng from '/ThreeJS/Textures/SpriteLine/spriteline1.png'
// import fragmentShader from './shader/fragment.glsl?raw'
// import vertexShader from './shader/vertex.glsl?raw'

const refDiv = ref<HTMLDivElement>()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, 1920 / 1080, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
const controlds = new OrbitControls(camera, renderer.domElement)
controlds.enableDamping = true
// const axisHelper = new THREE.AxesHelper(5)
// scene.add(axisHelper)
// 通过设置position来进行移动
camera.position.set(0, -5, 5)

const loader = new THREE.FileLoader()
loader.load(
  'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
  (data: any) => {
    const jsonData = JSON.parse(data)
    console.log(jsonData)
    dealBoundaryData(jsonData)
  },
)
const map = new THREE.Object3D()
const dealBoundaryData = (jsonData: any) => {
  const features = jsonData.features
  features.map(
    (feature: {
      properties: { name: string }
      geometry: { coordinates: any; type: string }
    }) => {
      // 创建市区的物体
      const city = new THREE.Object3D()
      city.name = feature.properties.name
      // 获取特征的坐标
      const coordinates = feature.geometry.coordinates

      if (feature.geometry.type === 'Polygon') {
        coordinates.forEach((coords: any) => {
          const mesh = createMesh(coords)
          mesh.name = feature.properties.name
          city.add(mesh)
          const line = createLine(coords)
          city.add(line)
        })
      } else if (feature.geometry.type === 'MultiPolygon') {
        coordinates.forEach((coords: any[]) => {
          coords.forEach((cCoords: any) => {
            const mesh = createMesh(cCoords)
            mesh.name = feature.properties.name
            city.add(mesh)
            const line = createLine(cCoords)
            city.add(line)
          })
        })
      } else {
        return
      }
      map.add(city)
    },
  )
  scene.add(map)
}
const projection = d3.geoMercator().center([104.16, 30.6]).translate([0, 0])
const createMesh = (polygons: any) => {
  const shape = new THREE.Shape()
  polygons.forEach((row: any, i: number) => {
    const [longitute, latitude] = projection(row) || [0, 0]
    if (i === 0) {
      shape.moveTo(longitute, -latitude)
    }
    shape.lineTo(longitute, -latitude)
  })
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 2.0,
    bevelSize: 0,
  })
  const material = new THREE.MeshBasicMaterial({
    color: 0x00619b,
    transparent: true,
    opacity: 0.9,
    // wireframe: true
  })
  return new THREE.Mesh(geometry, material)
}
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(linePng)
texture.wrapS = texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(1, 1)
texture.needsUpdate = true
const lineMaterial = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.FrontSide,
  transparent: true,
})
// const materialParams = {
//   uniforms: {
//     map: { value: texture }, // 设置纹理
//     uTime: { value: 0 } // 设置时间初始值
//   },
//   vertexShader,
//   fragmentShader,
//   transparent: true // 开启透明
// }
// const lineMaterial = new THREE.ShaderMaterial(materialParams)
// const lineMaterial = new THREE.ShaderMaterial({
//   uniforms: {
//     uTime: { value: 0.0 },
//     uThickness: { value: 0.2 },
//     uColor: { value: new THREE.Color(0xffffff) },
//     uTexture: { value: texture }
//   },
//   vertexShader: `
//     uniform float uTime;
//     uniform float uThickness;
//     void main() {
//       vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
//       gl_Position = projectionMatrix * modelViewPosition;

//       gl_PointSize = uThickness * (1.0 / -modelViewPosition.z);
//     }
//   `,
//   fragmentShader: `
//     uniform float uTime;
//     uniform vec3 uColor;
//     void main() {
//       gl_FragColor = vec4(uColor, 1.0);
//     }
//   `
// })
// const lineMaterialWithTexture = new THREE.LineBasicMaterial({
//   transparent: true,
//   opacity: 0.8
// })
// lineMaterialWithTexture.map = texture
// lineMaterialWithTexture.uniforms = {
//   uTime: { value: 0.0 }
// }
// const createLine = (polygon: any) => {
//   const lineGeometry = new THREE.BufferGeometry()
//   const pointsArray: any[] = []
//   polygon.forEach(row => {
//     const [longitude, latitude] = projection(row) || [0, 0]
//     pointsArray.push(new THREE.Vector3(longitude, -latitude, 3.3))
//   })
//   // 通过点生成几何体
//   lineGeometry.setFromPoints(pointsArray)
//   // 创建随机颜色
//   // const color = randomColor()
//   // texture.wrapS = texture.wrapT = THREE.RepeatWrapping
//   // texture.repeat.set(1, 1)
//   // texture.needsUpdate = true
//   // // 创建线材质
//   // const lineMaterial = new THREE.MeshBasicMaterial({
//   //   map: texture,
//   //   side: THREE.DoubleSide,
//   //   transparent: true
//   // })

//   // const lineMaterial = new THREE.LineBasicMaterial({ color })
//   return new THREE.Line(lineGeometry, lineMaterial)
//   // return new THREE.Line(lineGeometry, lineMaterialWithTexture)
// }
const createLine = (polygon: any) => {
  const pointsArray: any[] = []
  polygon.forEach((row: any) => {
    const [longitude, latitude] = projection(row) || [0, 0]
    pointsArray.push(new THREE.Vector3(longitude, -latitude, 2.3))
  })
  // const curve = new THREE.CatmullRomCurve3(pointsArray)
  // // 通过点生成几何体
  // const lineGeometry = new THREE.TubeGeometry(
  //   curve,
  //   pointsArray.length - 1,
  //   0.01
  // )
  let curve = new THREE.CatmullRomCurve3(pointsArray)
  const lineGeometry = new THREE.TubeGeometry(curve, 80, 0.1)
  // lineGeometry.setFromPoints(pointsArray)
  // 创建随机颜色
  // const color = randomColor()
  // texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  // texture.repeat.set(1, 1)
  // texture.needsUpdate = true
  // // 创建线材质
  // const lineMaterial = new THREE.MeshBasicMaterial({
  //   map: texture,
  //   side: THREE.DoubleSide,
  //   transparent: true
  // })

  // const lineMaterial = new THREE.LineBasicMaterial({ color })
  return new THREE.Mesh(lineGeometry, lineMaterial)
  // return new THREE.Line(lineGeometry, lineMaterialWithTexture)
}
// const randomColor = () => {
//   return new THREE.Color(Math.random() * 0xffffff)
// }
// const clock = new THREE.Clock()
const run = () => {
  requestAnimationFrame(run)
  // const time = clock.getElapsedTime()
  // lineMaterial.uniforms.uTime.value += time
  // lineMaterialWithTexture.uniforms.uTime.value = time
  // params.uniforms.uTime = time
  // 设置enableDamping需要调用update方法
  if (texture) texture.offset.x -= 0.005
  controlds.update()
  renderer.render(scene, camera)
}
const resizeDiv = () => {
  if (!refDiv.value) return
  // 更新摄像头
  // camera.aspect = window.innerWidth / window.innerHeight
  camera.aspect = refDiv.value.clientWidth / refDiv.value.clientHeight
  // 更新摄像头的投影矩阵
  camera.updateProjectionMatrix()
  renderer.setSize(refDiv.value.clientWidth, refDiv.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
}
const init = () => {
  resizeDiv()
  refDiv.value?.appendChild(renderer.domElement)
  run()
}
// 在三维空间中，流光效果可以通过创建一个具有粗糙度的线条，并对其进行材质和纹理调整来实现。以下是一种可能的实现方式：
// 1. 创建一条几何线条，并将其转换为缓冲区几何体。

// const geometry = new THREE.BufferGeometry().setFromPoints([
//   new THREE.Vector3(-10, 0, 0),
//   new THREE.Vector3(0, 15, 0),
//   new THREE.Vector3(10, 0, 0)
// ])
// 2. 创建一个自定义的材质，用于控制线条的外观。可以使用THREE.ShaderMaterial来编写自己的着色器代码，以实现所需的效果。

// const material = new THREE.ShaderMaterial({
//   uniforms: {
//     uTime: { value: 0.0 },
//     uThickness: { value: 0.2 },
//     uColor: { value: new THREE.Color(0xffffff) }
//   },
//   vertexShader: `
//     uniform float uTime;
//     uniform float uThickness;
//     void main() {
//       vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
//       gl_Position = projectionMatrix * modelViewPosition;

//       gl_PointSize = uThickness * (1.0 / -modelViewPosition.z);
//     }
//   `,
//   fragmentShader: `
//     uniform float uTime;
//     uniform vec3 uColor;
//     void main() {
//       gl_FragColor = vec4(uColor, 1.0);
//     }
//   `
// })
// 该材质包含三个uniform变量：uTime、uThickness和uColor。在顶点着色器中，计算每个顶点的位置，并将其传递给片段着色器。在片段着色器中，只需将颜色设置为指定的uColor值。
// 3. 将自定义材质应用于几何体，并将其添加到场景中。
// const line = new THREE.Line(geometry, material)
// scene.add(line)

// 4. 在每个帧中更新时间uniform的值，以实现流光效果的动态变化。
// function animate() {
//   requestAnimationFrame(animate)
//   material.uniforms.uTime.value += 0.1
//   renderer.render(scene, camera)
// }
let lastPicker: any
onMounted(() => {
  init()
  window.addEventListener('resize', () => {
    // 更新渲染器
    resizeDiv()
  })
  // window.addEventListener('dblclick', () => {
  //   if (document.fullscreenElement) {
  //     document.exitFullscreen()
  //   } else {
  //     renderer.domElement.requestFullscreen()
  //   }
  // })
  window.addEventListener('click', (e) => {
    if (!refDiv.value) return
    // 获取鼠标的位置
    const mouse = new THREE.Vector2()
    mouse.x = (e.offsetX / refDiv.value.clientWidth) * 2 - 1
    mouse.y = -(e.offsetY / refDiv.value.clientHeight) * 2 + 1

    // 获取鼠标点击的位置
    const rayCaster = new THREE.Raycaster()
    rayCaster.setFromCamera(mouse, camera)
    // 获取点击的点
    const intersects = rayCaster.intersectObjects(map.children)
    if (intersects.length) {
      if (intersects[0].object.name) {
        if (lastPicker) {
          lastPicker.material.color.copy(lastPicker.material.oldColor) // 恢复原来的颜色
        }
        lastPicker = intersects[0].object
        lastPicker.material.oldColor = lastPicker.material.color.clone() // 记录原来的颜色
        lastPicker.material.color.set(0xbbd5fa)
      }
      // console.log(intersects[0].object.name)
    } else if (lastPicker) {
      lastPicker.material.color.copy(lastPicker.material.oldColor)
    }
  })
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
}
</style>
