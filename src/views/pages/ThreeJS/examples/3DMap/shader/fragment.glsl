 uniform sampler2D map; // 纹理变量
  varying vec2 vUv;
  void main() {
    vec4 textureColor = texture2D(map, vUv); // 获取纹理颜色
    gl_FragColor = vec4(textureColor.rgb, textureColor.a * 0.8); // 设置颜色和透明度
  }