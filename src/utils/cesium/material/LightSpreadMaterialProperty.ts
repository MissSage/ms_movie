import * as Cesium from 'cesium'
import gsap from 'gsap'
export class LightSpreadMaterialProperty {
  name: string
  definitionChanged: Cesium.Event
  params: any
  constructor(name: string) {
    this.name = name
    this.definitionChanged = new Cesium.Event()
    ;(Cesium.Material as any)._materialCache.addMaterial(
      'LightSpreadMaterial',
      {
        fabric: {
          type: 'LightSpreadMaterial',
          uniforms: {
            uTime: 0,
            image: '/Cesium/Custom/texture/hexagon.png',
          },
          source: `
          czm_material czm_getMaterial(czm_materialInput materialInput)
          {
            // 生成默认的基础材质
            czm_material material = czm_getDefaultMaterial(materialInput);
            vec2 st = materialInput.st;
            // 根据uv采样颜色
            vec4 color = texture(image, st);
            material.diffuse = color.rgb;
            material.alpha = color.a;
            return material;
          }

          `,
        },
      },
    )

    this.params = {
      uTime: 0,
    }
    gsap.to(this.params, {
      uTime: 6.28,
      duration: 1,
      repeat: -1,
      ease: 'linear',
    })
  }
  getType() {
    // 返回材质类型
    return 'LightSpreadMaterial'
  }
  getValue(time: any, result: any) {
    result.uTime = this.params.uTime
    // 返回材质值
    return result
  }
  equals(other: any) {
    // 判断两个材质是否相等
    return (
      other instanceof LightSpreadMaterialProperty && this.name === other.name
    )
  }
}
