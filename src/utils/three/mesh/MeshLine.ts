import * as THREE from 'three'
export default class MeshLine {
  material: THREE.LineBasicMaterial
  geometry: THREE.EdgesGeometry<any>
  mesh: THREE.LineSegments<THREE.EdgesGeometry<any>, any>
  constructor(
    geometry: any,
    properties?: { color?: THREE.ColorRepresentation },
  ) {
    const edges = new THREE.EdgesGeometry(geometry)
    this.material = new THREE.LineBasicMaterial({
      color: properties?.color ?? 0xffffff,
    })
    const line = new THREE.LineSegments(edges, this.material)
    this.geometry = edges
    this.mesh = line
  }
}
