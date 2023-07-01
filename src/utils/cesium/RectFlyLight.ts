import * as Cesium from 'cesium'
import * as turf from '@turf/turf'
import { PolylineTrailMaterialProperty } from './material/PolylineTrailMaterialProperty'
import { BBox } from '@turf/turf'
export class RectFlyLight {
  bbox: BBox
  constructor(viewer: Cesium.Viewer) {
    // 设置矩形区域
    this.bbox = [113.2691, 23.014, 113.3691, 23.159]
    // 创建随机点
    const points = turf.randomPoint(300, {
      bbox: this.bbox,
    })
    // console.log(points);
    // 通过生成的随机点生成线
    const features = points.features
    features.forEach((item) => {
      // 获取点的经纬度
      const point = item.geometry.coordinates
      // 根据点设置起始位置
      const start = Cesium.Cartesian3.fromDegrees(point[0], point[1], 0)
      // 根据点设置结束位置
      const end = Cesium.Cartesian3.fromDegrees(
        point[0],
        point[1],
        200 + Math.random() * 3000,
      )
      //   创建线
      viewer.entities.add({
        polyline: {
          positions: [start, end],
          width: 2,
          material: new PolylineTrailMaterialProperty() as any,
        },
      })
    })
  }
}
