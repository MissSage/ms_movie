varying vec2 vUv;
// 高程
varying float vElevation;

// 纹理
uniform sampler2D uTexture;
void main() {
  float height = vElevation + 0.05 * 20.0;
  // gl_FragColor = vec4(1.0 * height, 0.0, 0.0, 1.0);
  // 根据UV取出纹理的颜色
  vec4 textureColor = texture2D(uTexture,vUv);
  // 让颜色与高度相关，即：低谷处受光照弱，颜色强度弱，高峰处受光照强，颜色强度强
  textureColor.rgb *= height;
  // 把纹理颜色设置到片元着色器
  gl_FragColor = textureColor;
}