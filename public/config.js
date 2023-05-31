const SITE_CONFIG = {
  GIS_CONFIG: {
    gisService: 'http://111.229.240.180:6080/arcgis/rest/services/ANQING',
    gisTdtToken:'be4a83d8298d7aa84cb5e0ff3e1dad58',
    // gisSDK: 'http://localhost:8999/arcgis_js_api/javascript/4.26',
    gisSDK: 'http://111.229.240.180:8003/arcgis_js_api/javascript/4.26',
    pipeService: 'http://111.229.240.180:6080/arcgis/rest/services/ANQING/PIPE_QY_ANQING/MapServer'
  },
  apiBase: 'http://localhost:3000',
  movieConfig: {
    audioBase: 'http://localhost:3000',
    imgBase: 'http://localhost:8081',
    movieBase: 'http://localhost:8081',
  },
  imageConfig: {
    imageBase: 'http://localhost:8082'
  },
  audioConfig:{
    audioBase: 'http://localhost:8083',
    imgBase: 'http://localhost:8083'
  }
}
window.SITE_CONFIG = SITE_CONFIG
