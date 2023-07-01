import * as Cesium from 'cesium'
import { SpritelineMaterialProperty } from './material/SpritelineMaterialProperty'
export class RoadLightLine {
  constructor(viewer: Cesium.Viewer) {
    const geoJsonPromise = Cesium.GeoJsonDataSource.load(
      '/Cesium/Custom/geojson/roadline.geojson',
    )
    geoJsonPromise.then((dataSource) => {
      viewer.dataSources.add(dataSource)
      const entities = dataSource.entities.values
      const spritelineMaterialProperty = new SpritelineMaterialProperty()
      entities.forEach((item) => {
        const polyline = item.polyline
        if (!polyline) return
        polyline.material = spritelineMaterialProperty as any
      })
    })
  }
}
