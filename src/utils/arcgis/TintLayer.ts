import BaseTileLayer from '@arcgis/core/layers/BaseTileLayer.js'
import esriRequest from '@arcgis/core/request.js'

class TintLayer extends BaseTileLayer {
  constructor(properties: { urlTemplate: string; subDomains: string[]; color?: any }) {
    super()
    this.urlTemplate = properties.urlTemplate
    this.color = properties.color
    this.subDomains = properties.subDomains
  }

  subDomains: string[]

  urlTemplate: string

  color: any

  getTileUrl(level: number, row: number, col: number): string {
    const length = this.subDomains.length
    const idx = col % length
    return (
      this.urlTemplate
        .replace('{level}', level.toString())
        .replace('{col}', col.toString())
        .replace('{row}', row.toString())
        .replace('{subDomain}', this.subDomains[idx]) +
      '&color=' +
      (this.color || '')
    )
  }

  fetchTile(
    level: number,
    row: number,
    col: number,
    options?: __esri.BaseTileLayerFetchTileOptions | undefined,
  ): Promise<HTMLCanvasElement | HTMLImageElement> {
    // call getTileUrl() method to construct the URL to tiles
    // for a given level, row and col provided by the LayerView
    const url = this.getTileUrl(level, row, col)
    // 此行用于处理天地图级别大于18时无内容的情况，reject以保持之前渲染的图形不被刷掉
    if (level >= 19) return Promise.reject()

    // request for tiles based on the generated url
    // the signal option ensures that obsolete requests are aborted
    return esriRequest(url, {
      responseType: 'image',
      signal: options && options.signal,
    }).then((response) => {
      // when esri request resolves successfully
      // get the image from the response
      const image = response.data
      const width = this.tileInfo.size[0]
      const height = this.tileInfo.size[0]

      // create a canvas with 2D rendering context
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d') as CanvasRenderingContext2D
      canvas.width = width
      canvas.height = height

      // Apply the tint color provided by
      // by the application to the canvas
      if (this.color) {
        // Get a CSS color string in rgba form
        // representing the tint Color instance.
        // debugger
        context.fillStyle = this.color
        context.filter = 'grayscale(0%) invert(100%) opacity(100%)'
        context.fillRect(0, 0, width, height)

        // Applies "difference" blending operation between canvas
        // and steman tiles. Difference blending operation subtracts
        // the bottom layer (canvas) from the top layer (tiles) or the
        // other way round to always get a positive value.
        context.globalCompositeOperation = 'difference'
      }

      // Draw the blended image onto the canvas.
      context.drawImage(image, 0, 0, width, height)

      return canvas
    })
  }
}
export default TintLayer
