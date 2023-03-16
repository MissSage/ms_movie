import Map from '@arcgis/core/Map.js'
import MapView from '@arcgis/core/views/MapView.js'
import MapImageLayer from '@arcgis/core/layers/MapImageLayer.js'
import TintLayer from '@/utils/arcgis/TintLayer'
export class MapApp {
  private mapView?: __esri.MapView
  async initMap(container: string | HTMLDivElement | undefined, baseMap?: 'tdt' | 'gd') {
    const tiledLayer =
      baseMap === 'tdt'
        ? [
            new TintLayer({
              urlTemplate: `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${window.SITE_CONFIG.gisConfig.tdtToken}`,
              subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            }),
          ]
        : [
            new TintLayer({
              urlTemplate: `http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={col}&y={row}&z={level}`,
              subDomains: [],
            }),
            new TintLayer({
              urlTemplate: `http://webst04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={col}&y={row}&z={level}`,
              subDomains: [],
            }),
          ]
    // })
    const map = new Map({
      basemap: {
        baseLayers: tiledLayer,
      },
    })
    this.mapView = new MapView({
      map,
      container,
      extent: {
        // autocasts as new Extent()
        xmin: -9177811,
        ymin: 4247000,
        xmax: -9176791,
        ymax: 4247784,
        spatialReference: { wkid: 102100 },
      },
    })
    await this.mapView.when()
  }
  async addPipe() {
    debugger
    const pipeLayer = new MapImageLayer({
      url: 'http://111.229.240.180:6080/arcgis/rest/services/ANQING/PIPE_QY_ANQING/MapServer',
    })
    this.mapView?.map.add(pipeLayer)
    await pipeLayer.when()
    this.mapView?.goTo(pipeLayer.fullExtent)
  }
}
