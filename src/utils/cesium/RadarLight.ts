import * as Cesium from 'cesium'
import { RadarMaterialProperty } from './material/RadarMaterialProperty'

export class RadarLight {
  radarMaterial: RadarMaterialProperty
  entity: Cesium.Entity
  constructor(viewer: Cesium.Viewer) {
    // 113.3191,23.109,
    // 设置雷达材质
    this.radarMaterial = new RadarMaterialProperty('radarMaterial')
    this.entity = viewer.entities.add({
      rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(
          113.3291,
          23.119,
          113.3341,
          23.124,
        ),
        material: this.radarMaterial as any,
      },
    })
  }
}
