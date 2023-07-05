import { createLableObj, loadFile, MeshLine } from '@/utils/three'
import * as THREE from 'three'
import * as d3 from 'd3'

// 场景坐标转换
const projection = d3
  .geoMercator()
  .center([100.755234, 37.20893])
  .translate([0, 0])

/**
 * 加载边界
 */
export const dealBoundaryData = async (
  url: string,
  texture: THREE.Texture,
  height?: number,
) => {
  // 总的数据对象
  const map = new THREE.Object3D()
  try {
    const jsonData = await loadFile(
      url || '/ThreeJS/geojson/gansu_boundary.geojson',
    )
    console.log(jsonData)

    const features = jsonData.features
    features.map((feature: any) => {
      // 创建市区的物体
      const city = new THREE.Object3D()
      city.name = feature.properties.name
      // 获取特征的坐标
      const coordinates = feature.geometry.coordinates

      if (feature.geometry.type === 'Polygon') {
        coordinates.forEach((coords: any[]) => {
          const mesh = createMesh(coords, texture, height)
          mesh.name = feature.properties.name
          city.add(mesh)
          // const line = createLine(coords)
          // city.add(line)
          const line = new MeshLine(mesh.geometry)
          city.add(line.mesh)
        })
      } else if (feature.geometry.type === 'MultiPolygon') {
        coordinates.forEach((coords: any) => {
          coords.forEach((cCoords: any) => {
            const mesh = createMesh(cCoords, texture, height)
            mesh.name = feature.properties.name
            city.add(mesh)
            // const line = createLine(cCoords)
            // city.add(line)

            const line = new MeshLine(mesh.geometry)
            city.add(line.mesh)
          })
        })
      } else {
        return
      }
      map.add(city)
    })
  } catch (error) {
    console.log(error)
  }
  return map
}
export const createMarrineTexture = () => {
  // 加载范围纹理
  const textureLoader = new THREE.TextureLoader()
  const marrineTexture = textureLoader.load('/ThreeJS/Textures/bg/marrine.png')
  marrineTexture.wrapS = marrineTexture.wrapT = THREE.RepeatWrapping
  marrineTexture.offset.set(0, 0.13)
  marrineTexture.repeat.set(0.02, 0.02)
  return marrineTexture
}
/**
 * 创建各范围实体
 * @param polygons
 */
const createMesh = (
  polygons: [number, number][],
  texture: THREE.Texture,
  height = 1.0,
) => {
  const shape = new THREE.Shape()
  polygons.forEach((row, i) => {
    const [longitute, latitude] = projection(row) || [0, 0]
    if (i === 0) {
      shape.moveTo(longitute, -latitude)
    }
    shape.lineTo(longitute, -latitude)
  })
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: height,
    bevelSize: 0,
  })
  // 两面材质
  const material1 = new THREE.MeshBasicMaterial({
    color: 0x00619b,
    transparent: true,
    opacity: 1,
    map: texture,
    // wireframe: true
  })
  // 侧边材质
  const material2 = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.9,
  })
  return new THREE.Mesh(geometry, [material1, material2])
}
export const dealLineData = async (
  url: string,
  texture: THREE.Texture,
  height?: number,
) => {
  // 加载管线流光纹理
  const jsonData = await loadFile(url)

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide,
    transparent: true,
  })
  const features = jsonData.features
  // 总的数据对象
  const map = new THREE.Object3D()
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

      if (feature.geometry.type === 'LineString') {
        const line = createLine(coordinates, material, height)
        city.add(line)
      }
      map.add(city)
    },
  )
  return map
}
export const createSpritelineTexure = () => {
  const textureLoader = new THREE.TextureLoader()
  const lineTexture = textureLoader.load(
    '/ThreeJS/Textures/SpriteLine/spriteline1.png',
  )
  lineTexture.wrapS = lineTexture.wrapT = THREE.RepeatWrapping
  lineTexture.repeat.set(1, 1)
  lineTexture.needsUpdate = true
  return lineTexture
}
type IFeature = {
  id: any
  properties: { name: string; type: string }
  geometry: { coordinates: any; type: string }
}
// 创建管线
const createLine = (
  path: [number, number][],
  material: THREE.MeshBasicMaterial,
  height = 1.0,
) => {
  const pointsArray: any[] = []
  path.forEach((row) => {
    const [longitude, latitude] = projection(row) || [0, 0]
    pointsArray.push(
      new THREE.Vector3(longitude, -latitude, (height ?? 1.0) + 0.3),
    )
  })
  const curve = new THREE.CatmullRomCurve3(pointsArray, false, 'catmullrom', 0)
  const lineGeometry = new THREE.TubeGeometry(curve, 80, 0.1)
  return new THREE.Mesh(lineGeometry, material)
}
export const typeArr = [
  { type: 'lljcd', name: '流量监测点' },
  { type: 'bf', name: '泵房' },
  { type: 'sc', name: '水厂' },
  { type: 'syd', name: '水源地' },
  { type: 'szjcd', name: '水质监测点' },
  { type: 'yljcd', name: '压力监测点' },
]
export const typeObj: Record<string, string> = {
  lljcd: '流量监测点',
  bf: '泵房',
  sc: '水厂',
  syd: '水源地',
  szjcd: '水质监测点',
  yljcd: '压力监测点',
}
export const dealPointData = async (url: string, height = 1.0) => {
  const jsonData = await loadFile(url)
  const features = jsonData.features
  const map = new THREE.Object3D()
  const textMap = new THREE.Object3D()
  // const font = await loadFont('/THREEJS/fonts/helvetiker_regular.typeface.json')
  features.map((feature: IFeature, i: number) => {
    const id = feature.id
    // 创建点
    const point = new THREE.Object3D()
    point.name = feature.properties.name

    if (feature.geometry.type === 'Point') {
      const sprite = createMarkSprite(
        id,
        typeArr[i % (typeArr.length - 1)],
        feature.geometry.coordinates,
        height,
      )
      // 添加图标
      map.add(sprite)
      // 添加图标文本

      const [longitude, latitude] = projection(
        feature.geometry.coordinates,
      ) || [0, 0]
      const label = createLableObj(typeObj[feature.properties.type], {
        longitude,
        latitude,
        height: height + 0.5,
        className: 'laber_name ' + feature.properties.type,
      })
      textMap.add(label)
    }
  })
  return {
    map,
    textMap,
    features,
  }
}
// 加载标点纹理
const loadTexture = (name: string) => {
  const textureLoader = new THREE.TextureLoader()
  return textureLoader.load('/ThreeJS/Textures/legends/' + name + '.png')
}

const createMarkSprite = (
  id: string,
  station: { name: string; type: string },
  coordinates: [number, number],
  height: number,
) => {
  const [longitude, latitude] = projection(coordinates) || [0, 0]
  console.log(longitude, latitude)

  const texture = loadTexture(station.type)
  const material = new THREE.SpriteMaterial({
    map: texture,
    sizeAttenuation: false,
  })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(0.1, 0.1, 0.1)
  sprite.position.set(longitude, -latitude, height + 0.5)
  const material1 = new THREE.SpriteMaterial({
    map: texture,
    sizeAttenuation: false,
    depthTest: false,
    opacity: 0.2,
  })
  const sprite1 = new THREE.Sprite(material1)
  sprite.add(sprite1)
  sprite.name = id
  return sprite
}
