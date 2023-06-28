import * as Cesium from 'cesium'
/**
 * cesium的基础配置
 */
export const basicSettingForCesium = () => {
  // 静态资源配置
  window.CESIUM_BASE_URL = '/Cesium'
  // 配置token
  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYTViOTAwMS1lMjg5LTRlZGQtYWE1OS1jMGJmNTA3YTdkMjEiLCJpZCI6MTQyNjIzLCJpYXQiOjE2ODU0MjIxMTF9.ALFjYRe62G323AhI0JNFMXktkcdOGm5ANLfpR51dIPQ'
  // 中国默认范围
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
    // 西边的经度
    89.5,
    // 南边维度
    20.4,
    // 东边经度
    110.4,
    // 北边维度
    61.2,
  )
}
/**
 * viewer的构造器参数
 */
export const viewerConstructorOptions: Cesium.Viewer.ConstructorOptions = {
  // 是否显示信息窗口
  infoBox: false,
  // 是否显示查询按钮
  geocoder: false,
  // 不显示home按钮
  homeButton: false,
  // 控制查看器的显示模式
  sceneModePicker: false,
  // 是否显示图层选择
  baseLayerPicker: false,
  // 是否显示帮助按钮
  navigationHelpButton: false,
  // 是否播放动画
  animation: false,
  // 是否显示时间轴
  timeline: false,
  // 是否显示全屏按钮
  fullscreenButton: false,
  // 设置天空盒
  skyBox: new Cesium.SkyBox({
    sources: {
      positiveX: '/texture/sky/px.jpg',
      negativeX: '/texture/sky/nx.jpg',
      positiveY: '/texture/sky/ny.jpg',
      negativeY: '/texture/sky/py.jpg',
      positiveZ: '/texture/sky/pz.jpg',
      negativeZ: '/texture/sky/nz.jpg',
    },
  }),
  // 天地图矢量路径图
  // imageryProvider: new WebMapTileServiceImageryProvider({
  //   url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=30d07720fa76f07732d83c748bb84211",
  //   layer: "tdtBasicLayer",
  //   style: "default",
  //   format: "image/jpeg",
  //   tileMatrixSetID: "GoogleMapsCompatible",
  // }),
  //   天地图影像服务
  // imageryProvider: new WebMapTileServiceImageryProvider({
  //   url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=30d07720fa76f07732d83c748bb84211",
  //   layer: "tdtBasicLayer",
  //   style: "default",
  //   format: "image/jpeg",
  //   tileMatrixSetID: "GoogleMapsCompatible",
  // }),
  // OSM地图,
  // imageryProvider: new OpenStreetMapImageryProvider({
  //   url: "https://a.tile.openstreetmap.org/",
  // }),
  // 高德矢量地图,
  // imageryProvider: new UrlTemplateImageryProvider({
  //   url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
  // }),
  // 设置地形
  terrainProvider: Cesium.createWorldTerrain({
    requestVertexNormals: true,
    requestWaterMask: true,
  }),
  // 设置自定义地形
  // terrainProvider: new CesiumTerrainProvider({
  //   url: '/terrains/gz',
  // }),
}
/**
 * 设置相机
 * @param viewer
 * @returns
 */
export const initCamera = (viewer: Cesium.Viewer) => {
  // 相机的基础设置
  // 生成position是天安门的位置
  const position = Cesium.Cartesian3.fromDegrees(116.393428, 39.90923, 100)
  // setview瞬间到达指定位置，视角
  // viewer.camera.setView({
  //   // 指定相机位置
  //   destination: position,
  //   // 指定相机视角
  //   orientation: {
  //     // 指定相机的朝向,偏航角
  //     heading: Cesium.Math.toRadians(0),
  //     // 指定相机的俯仰角,0度是竖直向上,-90度是向下
  //     pitch: Cesium.Math.toRadians(-20),
  //     // 指定相机的滚转角,翻滚角
  //     roll: 0,
  //   },
  // });
  // flyto,让相机飞往某个地方
  return new Promise((resolve, reject) =>
    viewer.camera.flyTo({
      destination: position,
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-20),
        roll: 0,
      },
      complete: () => {
        resolve(undefined)
      },
      cancel: () => {
        reject()
      },
    }),
  )
}
/**
 * 测试Cesium的坐标转换功能
 */
export const testDegreeTransform = () => {
  // 坐标系与坐标转换
  // 1. 屏幕坐标系统，二维的笛卡尔坐标系，Cartesian2类型
  // 2. 地理坐标系统，WGS-84坐标系，Cartographic类型,经度，纬度，高度
  // 3. 笛卡尔空间直角坐标系，Cartesian3类型

  // 角度与弧度转换
  const radians = Cesium.Math.toRadians(90)
  console.log(radians)
  // 弧度转角度
  const degree = Cesium.Math.toDegrees(2 * Math.PI)
  console.log(degree)

  // 将经纬度转为笛卡尔坐标
  const cartesian3 = Cesium.Cartesian3.fromDegrees(
    // 经度
    89.5,
    // 纬度
    20.4,
    // 高度
    100,
  )
  console.log(cartesian3)

  // 将笛卡尔坐标转为经纬度
  const cartographic = Cesium.Cartographic.fromCartesian(cartesian3)
  console.log(cartographic)
}
/**
 * 设置viewer的按键交互
 * @param viewer
 */
export const setMapInteractions = (viewer: Cesium.Viewer) => {
  // 通过按键移动相机
  document.addEventListener('keydown', (e) => {
    // console.log(e);
    // 获取相机离地面的高度
    const height = viewer.camera.positionCartographic.height
    const moveRate = height / 100
    if (e.key == 'w') {
      // 设置相机向前移动
      viewer.camera.moveForward(moveRate)
    } else if (e.key == 's') {
      // 设置相机向后移动
      viewer.camera.moveBackward(moveRate)
    } else if (e.key == 'a') {
      // 设置相机向左移动
      viewer.camera.moveLeft(moveRate)
    } else if (e.key == 'd') {
      // 设置相机向右移动
      viewer.camera.moveRight(moveRate)
    } else if (e.key == 'q') {
      // 设置相机向左旋转相机
      viewer.camera.lookLeft(Cesium.Math.toRadians(0.1))
    } else if (e.key == 'e') {
      // 设置相机向右旋转相机
      viewer.camera.lookRight(Cesium.Math.toRadians(0.1))
    } else if (e.key == 'r') {
      // 设置相机向上旋转相机
      viewer.camera.lookUp(Cesium.Math.toRadians(0.1))
    } else if (e.key == 'f') {
      // 设置相机向下旋转相机
      viewer.camera.lookDown(Cesium.Math.toRadians(0.1))
    } else if (e.key == 'g') {
      // 向左逆时针翻滚
      viewer.camera.twistLeft(Cesium.Math.toRadians(0.1))
    } else if (e.key == 'h') {
      // 向右顺时针翻滚
      viewer.camera.twistRight(Cesium.Math.toRadians(0.1))
    }
  })
}
/**
 * 往地图添加一个点
 * @param viewer
 * @returns
 */
export const addPoint = (viewer: Cesium.Viewer) => {
  viewer.entities.add({
    // 定位点
    position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109),
    // 点
    point: {
      pixelSize: 10,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 4,
    },
  })
}
/**
 * 添加标签
 * @param viewer
 * @returns
 */
export const addTower = (viewer: Cesium.Viewer, goto?: boolean) => {
  const position = Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 1000)
  const label = new Cesium.Entity({
    position: position,
    label: {
      text: '广州塔',
      font: '24px sans-serif',
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 4,
      // FILL填充文字，OUTLINE勾勒标签，FILL_AND_OUTLINE填充文字和勾勒标签
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      // 设置文字的偏移量
      pixelOffset: new Cesium.Cartesian2(0, -24),
      // 设置文字的显示位置,LEFT /RIGHT /CENTER
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      // 设置文字的显示位置
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
    billboard: {
      image: '/texture/gzt.png',
      width: 50,
      height: 50,
      // 设置广告牌的显示位置
      verticalOrigin: Cesium.VerticalOrigin.TOP,
      // 设置广告牌的显示位置
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    },
  })
  viewer.entities.add(label)
  return new Promise((resolve, reject) => {
    ;(goto &&
      viewer.camera.flyTo({
        destination: position,
        orientation: {
          // 绕z旋转，左右,右正,左负,360度和0度是一样的
          heading: Cesium.Math.toRadians(0),
          // 绕y旋转，上下，上正，下负
          pitch: Cesium.Math.toRadians(-20),
          // 绕x旋转，顺时针逆时针，顺正，逆负
          roll: 0,
        },
        complete: () => {
          resolve(undefined)
        },
        cancel: () => {
          reject()
        },
      })) ||
      resolve(undefined)
  })
}
/**
 * 添加一个primitive元素
 * @param viewer
 */
export const addPrimitive = (viewer: Cesium.Viewer) => {
  // 使用entity创建矩形
  // 添加3D建筑
  // const osmBuildings = viewer.scene.primitives.add(
  //   new Cesium.createOsmBuildings()
  // );
  // 使用entity创建矩形
  // 不同的材质
  // 基本颜色材质
  // let material = new Cesium.ColorMaterialProperty(
  //   new Cesium.Color(1.0, 1.0, 1.0, 1.0)
  // );
  // 棋盘纹理
  // let material = new Cesium.CheckerboardMaterialProperty({
  //   evenColor: Cesium.Color.RED,
  //   oddColor: Cesium.Color.YELLOW,
  //   repeat: new Cesium.Cartesian2(2, 2),
  // });
  // 条纹纹理
  // let material = new Cesium.StripeMaterialProperty({
  //   evenColor: Cesium.Color.WHITE,
  //   oddColor: Cesium.Color.BLACK,
  //   repeat: 8,
  // });
  // 网格纹理
  const material = new Cesium.GridMaterialProperty({
    color: Cesium.Color.YELLOW,
    cellAlpha: 0.2,
    lineCount: new Cesium.Cartesian2(4, 4),
    lineThickness: new Cesium.Cartesian2(4.0, 4.0),
  })
  // 会在地图加载好后再显示
  viewer.entities.add({
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(
        // 西边的经度
        90,
        // 南边维度
        20,
        // 东边经度
        110,
        // 北边维度
        30,
      ),
      // material: Cesium.Color.RED.withAlpha(0.5),
      material: material,
    },
  })
  // 添加线型图元
  // 设置虚线材质
  // let material1 = new Cesium.PolylineDashMaterialProperty({
  //   dashLength: 30,
  //   color: Cesium.Color.RED,
  // });

  // 设置箭头材质
  const material1 = new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED)

  // 设置发光飞线效果
  // const material1 = new Cesium.PolylineGlowMaterialProperty({
  //   // 设置发光程度
  //   glowPower: 0.8,
  //   // 尾椎缩小程度
  //   taperPower: 0.7,
  //   color: Cesium.Color.RED,
  // })

  viewer.entities.add({
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35, 20, 5]),
      width: 20,
      material: material1,
    },
  })
  // primivite创建矩形
  // 地图还没加载就可以显示了
  // 01-创建几何体
  const rectGeometry = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(
      // 西边的经度
      115,
      // 南边维度
      20,
      // 东边经度
      135,
      // 北边维度
      30,
    ),
    // 距离表面高度
    height: 0,
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
  })

  // 02-创建几何体实例
  const instance = new Cesium.GeometryInstance({
    id: 'redRect',
    geometry: rectGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.RED.withAlpha(0.5),
      ),
    },
  })
  const rectGeometry1 = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(
      // 西边的经度
      140,
      // 南边维度
      20,
      // 东边经度
      160,
      // 北边维度
      30,
    ),
    // 距离表面高度
    height: 1000,
  })

  const instance2 = new Cesium.GeometryInstance({
    id: 'blueRect',
    geometry: rectGeometry1,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.BLUE.withAlpha(0.5),
      ),
    },
  })

  // 03-设置外观
  // 使用instance的颜色去着色
  // let appearance = new Cesium.PerInstanceColorAppearance({
  //   flat: true,
  // });

  // type disffuseMap
  // const material2 = Cesium.Material.fromType('DiffuseMap', {
  //   image: './texture/logo.png',
  // })

  // // type grid
  // const material3 = Cesium.Material.fromType('Grid', {
  //   color: Cesium.Color.AQUA.withAlpha(0.5),
  //   cellAlpha: 0.2,
  //   lineCount: new Cesium.Cartesian2(4, 4),
  //   lineThickness: new Cesium.Cartesian2(4.0, 4.0),
  // })

  // type water
  const material4 = Cesium.Material.fromType('Water', {
    baseWaterColor: Cesium.Color.AQUA.withAlpha(0.4),
    distortion: 0.25,
    normalMap: '/Cesium/Assets/Textures/waterNormals.jpg',
  })

  // type image
  // const material5 = Cesium.Material.fromType('Image', {
  //   image: './texture/logo.png',
  //   repeat: new Cesium.Cartesian2(2.0, 2.0),
  // })

  // type color
  // const material6 = Cesium.Material.fromType('Color', {
  //   color: Cesium.Color.AQUA.withAlpha(0.5),
  // })
  // 设定几何体都是与地球的椭球体平行
  //假定几何体与地球椭球体平行，就可以在计算大量顶点属性的时候节省内存
  const appearance = new Cesium.EllipsoidSurfaceAppearance({
    material: material4,
    aboveGround: false,
    translucent: true,
  })

  // const appearance = new Cesium.MaterialAppearance({
  //   material: material2,
  // })
  // 04-图元
  const primitive = new Cesium.Primitive({
    geometryInstances: [instance, instance2],
    appearance: appearance,
    show: true,
  })
  // 05-添加到viewer
  viewer.scene.primitives.add(primitive)
  // 动态改变图元的样式
  // setInterval(() => {
  //   const attributes = primitive.getGeometryInstanceAttributes('redRect')
  //   attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(
  //     // Cesium.Color.YELLOW.withAlpha(0.5)
  //     Cesium.Color.fromRandom({
  //       alpha: 0.5,
  //     }),
  //   )
  // }, 2000)
  // 绑定拾取
  // const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  // handler.setInputAction((movement: any) => {
  //   // console.log(movement);
  //   // scene.pick选中物体
  //   const pickedObject = viewer.scene.pick(movement.position)
  //   console.log(pickedObject)
  //   if (Cesium.defined(pickedObject) && typeof pickedObject.id === 'string') {
  //     // console.log(pickedObject.id);
  //     const attributes = primitive.getGeometryInstanceAttributes(
  //       pickedObject.id,
  //     )
  //     attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(
  //       Cesium.Color.YELLOW.withAlpha(0.5),
  //     )
  //   }
  // }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}
/**
 * 添加飞机
 * @param viewer
 */
export const addAirPlane = (viewer: Cesium.Viewer, goto?: boolean) => {
  const position = Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 1500)
  const entity = {
    name: 'Airplane',
    position: position,
    model: {
      uri: '/model/Air.glb',
      // 设置飞机的最小像素
      minimumPixelSize: 128,
      // 设置飞机的轮廓
      silhouetteSize: 5,
      // 设置轮廓的颜色
      silhouetteColor: Cesium.Color.WHITE,
      // 设置相机距离模型多远的距离显示
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000),
    },
  }
  // 添加3D模型
  viewer.entities.add(entity)
  return new Promise((resolve, reject) => {
    ;(goto &&
      viewer.camera.flyTo({
        destination: position,
        orientation: {
          // 绕z旋转，左右,右正,左负,360度和0度是一样的
          heading: Cesium.Math.toRadians(0),
          // 绕y旋转，上下，上正，下负
          pitch: Cesium.Math.toRadians(-20),
          // 绕x旋转，顺时针逆时针，顺正，逆负
          roll: 0,
        },
        complete: () => {
          resolve(undefined)
        },
        cancel: () => {
          reject()
        },
      })) ||
      resolve(undefined)
  })
}
export const addBuildings = (viewer: Cesium.Viewer) => {
  // 添加3D建筑
  viewer.scene.primitives.add(
    Cesium.createOsmBuildings({
      style: new Cesium.Cesium3DTileStyle({
        color: {
          conditions: [
            ["${feature['building']} === 'hospital'", "color('#FF00FF')"],
            ["${feature['building']} === 'school'", "color('#00FF00')"],
            [true, "color('#ffffff')"],
          ],
        },
      }),
    }),
  )
}
