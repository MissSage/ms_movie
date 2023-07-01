import * as Cesium from 'cesium'

export const modifyBuild = async (viewer: Cesium.Viewer) => {
  // 添加3D建筑
  const tiles3d = await Cesium.createOsmBuildingsAsync({
    // style: new Cesium.Cesium3DTileStyle({
    //   show: "${feature['name']} !== '广州塔'",
    // }),
  })
  viewer.scene.primitives.add(tiles3d)
  //监听当瓦片加载时候执行事件
  tiles3d.tileVisible.addEventListener((tile: Cesium.Cesium3DTile) => {
    // console.log(tile);
    const cesium3DTileCon = tile.content
    const featuresLength = cesium3DTileCon.featuresLength
    // console.log(cesium3DTileCon);
    for (let i = 0; i < featuresLength; i++) {
      // const feature = cesium3DTileCon.getFeature(i)
      // feature.primitive.customShader = new Cesium.CustomShader({
      //   fragmentShaderText: `
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
      //   `,
      // })
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
    }
  })
}
