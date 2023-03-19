// import Map from '@arcgis/core/Map'
// import MapView from '@arcgis/core/views/MapView'
// import MapImageLayer from '@arcgis/core/layers/MapImageLayer'
import { initTintLayer } from '@/utils/arcgis/TintLayer'
import { loadModules, loadScript } from 'esri-loader'
export class MapApp {
  constructor(sdk = 'http://localhost:8999/arcgis_js_api/javascript/4.26') {
    this.sdk = sdk
  }
  private modules: {
    Map?: typeof __esri.Map
    MapView?: typeof __esri.MapView
    BaseTileLayer?: typeof __esri.BaseTileLayer
    MapImageLayer?: typeof __esri.MapImageLayer
    request?: typeof __esri.request
  } = {}
  private mapView?: __esri.MapView
  private sdk: string
  async loadScript() {
    await loadScript({
      url: `${this.sdk}/init.js`,
      css: `${this.sdk}/esri/themes/light/main.css`,
    })
  }
  async loadModules() {
    const [Map, MapView, BaseTileLayer, MapImageLayer, request] = await loadModules<
      [
        typeof __esri.Map,
        typeof __esri.MapView,
        typeof __esri.BaseTileLayer,
        typeof __esri.MapImageLayer,
        typeof __esri.request,
      ]
    >([
      'esri/Map',
      'esri/views/MapView',
      'esri/layers/BaseTileLayer',
      'esri/layers/MapImageLayer',
      'esri/request',
    ])
    this.modules = {
      Map,
      MapView,
      BaseTileLayer,
      MapImageLayer,
      request,
    }
  }
  async initMap(container: string | HTMLDivElement | undefined, baseMap?: 'tdt' | 'gd') {
    debugger
    await this.loadModules()
    const TintLayer = initTintLayer(this.modules.BaseTileLayer!, this.modules.request!)
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
    const map = new this.modules.Map!({
      basemap: {
        baseLayers: tiledLayer,
      },
    })
    this.mapView = new this.modules.MapView!({
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
    const pipeLayer = new this.modules.MapImageLayer!({
      url: 'http://111.229.240.180:6080/arcgis/rest/services/ANQING/PIPE_QY_ANQING/MapServer',
    })
    this.mapView?.map.add(pipeLayer)
    await pipeLayer.when()
    this.mapView?.goTo(pipeLayer.fullExtent)
  }
}
