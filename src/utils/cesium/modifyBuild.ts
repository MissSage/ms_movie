import * as Cesium from 'cesium'

export const modifyBuild = async (viewer: Cesium.Viewer) => {
  // 添加3D建筑
  const tileset = await Cesium.createOsmBuildingsAsync({
    // style: new Cesium.Cesium3DTileStyle({
    //   show: "${feature['name']} !== '广州塔'",
    // }),
  })
  tileset.customShader = new Cesium.CustomShader({
    lightingModel: Cesium.LightingModel.UNLIT,
    uniforms: {
      maxHeight: {
        type: Cesium.UniformType.FLOAT,
        value: 0.0,
      },
      minHeight: {
        type: Cesium.UniformType.FLOAT,
        value: 0.0,
      },
    },
    fragmentShaderText: `
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
            float curz = fsInput.attributes.positionMC.z;
            float d = (curz - minHeight) / (maxHeight - minHeight);
            float r = 0.01;
            r = fract(r * czm_frameNumber);
            float c = smoothstep(r, r+0.03, d) - smoothstep(r + 0.035,r + 0.04, d);
            vec3 linearColor = mix(vec3(1.0,1.0,1.0) ,vec3(255.0,48.0,48.0)/255.0,r);
            vec3 renderColor = mix(vec3(0.0,0.96,1.0) ,linearColor,c);
            material.diffuse = renderColor;
    }`
  })
  // const [maxheight, minheight] = [
  //   tileset.properties.Height.maximum,
  //   tileset.properties.Height.minimum,
  // ]
  // tileset.customShader.setUniform('maxHeight', maxheight)
  // tileset.customShader.setUniform('minHeight', minheight)
  // console.log(`Maximum building height: ${maxheight}`)
  // console.log(`Minimum building height: ${minheight}`)
  viewer.scene.primitives.add(tileset)
  //监听当瓦片加载时候执行事件
  // tileset.tileVisible.addEventListener((tile: Cesium.Cesium3DTile) => {
  //   // console.log(tile);
  //   const cesium3DTileCon = tile.content
  //   const featuresLength = cesium3DTileCon.featuresLength
  //   // console.log(cesium3DTileCon);
  //   for (let i = 0; i < featuresLength; i++) {
  //     const feature = cesium3DTileCon.getFeature(i)
  //     feature.primitive.customShader = new Cesium.CustomShader({
  //       // 在这里声明了varyings
  //       varyings: {
  //         v_selectedColor: Cesium.VaryingType.VEC4,
  //       },
  //       //用户在顶点着色器中分配varyings
  //       vertexShaderText: `
  //   void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
  //       float positiveX = step(0.0, vsOutput.positionMC.x);
  //       v_selectedColor = mix(
  //           vsInput.attributes.color_0,
  //           vsInput.attributes.color_1,
  //           vsOutput.positionMC.x
  //       );
  //   }
  // `,
  //       // 用户在片段着色器中使用 varying
  //       fragmentShaderText: `
  //   void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
  //       material.diffuse = v_selectedColor.rgb;
  //   }
  // `,
  //     })
      // const model = cesium3DTileCon.getFeature(i).content._model

      // // 修改模型的片元着色器
      // model._rendererResources.sourceShaders[1] = `
      //     varying vec3 v_positionEC;

      //     void main()
      //     {
      //         czm_materialInput materialInput;
      //         // 获取模型position信息
      //         vec4 position = czm_inverseModelView * vec4(v_positionEC, 1.0);
      //         //   根据高度来设置渐变颜色
      //         float  strength = position.z/200.0;
      //         gl_FragColor = vec4(strength,0.3*strength,strength, 1.0);

      //         //   动态光环
      //         //   czm_frameNumber获取当前帧数
      //         //   fract(x),返回x的小数部分
      //         float time  = fract(czm_frameNumber/(60.0*10.0));
      //       //   float time  = fract(czm_frameNumber/60.0)*6.28 ;
      //       //   实现往返的操作
      //           time = abs(time-0.5)*2.0;
      //       // time = sin(time);
      //       // clamp(x, min, max)，返回x在min和max之间的最小值
      //       float diff = abs(clamp(position.z/500.0, 0.0, 1.0) - time) ;
      //       // step(edge, x)，如果x大于等于edge，返回1，否则返回0
      //       diff = step(0.01, diff);
      //       gl_FragColor.rgb += vec3(0.5)*(1.0-diff);

      //     }

      // `

      // // 片元着色器已经修改，需要更新
      // model._shouldRegenerateShaders = true
    // }
  // })
}
