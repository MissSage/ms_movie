varying vec2 vUv;
uniform float uTime;
uniform float uScale;
#define PI 3.1415926535897932384626433832795;
// 随机函数
float random(vec2 st) {
  return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}
// 噪音函数
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}
vec2 rotate(vec2 uv,float rotation, vec2 mid){
  return vec2(
    cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
    cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
  );
}
void main() {
  
  // 渐变条纹
  // float strength = mod(vUv.x * 10.0, 1.0);
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // 条纹
  // float strength = mod(vUv.y * 10.0, 1.0);
  // strength = step(0.5, strength);
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // 方块
  // float strength = step(0.2, mod(vUv.x * 10.0, 1.0));
  // strength *= step(0.2, mod(vUv.y * 10.0, 1.0));
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // 复杂条形
  // float x = step(0.4, mod((vUv.x + uTime * 0.1) * 10.0, 1.0))*step(0.8, mod(vUv.y * 10.0, 1.0));
  // float x = step(0.4, mod(vUv.x * 10.0 - 0.2, 1.0))*step(0.8, mod(vUv.y * 10.0, 1.0));
  // float y = step(0.4, mod(vUv.y * 10.0, 1.0))*step(0.8, mod(vUv.x * 10.0, 1.0));
  // float strength = x+y;
  // gl_FragColor = vec4(vUv, 1.0, strength);

  // 十字
  // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
  // gl_FragColor = vec4(strength, strength, strength, 1.0);
  
  // 条纹渐变
  // float strength = floor(vUv.x * 10.0)/10.0;
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // 随机
  // float strength = random(vUv);
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // 随机格子
  // float strength = ceil(vUv.x*10.0)/10.0*ceil(vUv.y*10.0)/10.0;
  // strength = random(vec2(strength,strength));
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // 光斑
  // float strength = 0.15/distance(vUv,vec2(0.5,0.5)) - 1.0;
  // gl_FragColor = vec4(strength, strength, strength, 1.0);
  
  // 十字星星
  // float strength = 0.15/distance(vec2(vUv.x,(vUv.y - 0.5)* 5.0 + 0.5),vec2(0.5,0.5)) - 1.0;
  // strength += 0.15/distance(vec2(vUv.y,(vUv.x - 0.5)* 5.0 + 0.5),vec2(0.5,0.5)) - 1.0;
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // 旋转星星
  // vec2 rotateUv = rotate(vUv,uTime * 5.0,vec2(0.5));
  // float strength = 0.15/distance(vec2(rotateUv.x,(rotateUv.y - 0.5)* 5.0 + 0.5),vec2(0.5,0.5)) - 1.0;
  // strength += 0.15/distance(vec2(rotateUv.y,(rotateUv.x - 0.5)* 5.0 + 0.5),vec2(0.5,0.5)) - 1.0;
  // gl_FragColor = vec4(strength, strength, strength, 1.0);
  
  // 圆形
  // float strength = step(0.5, distance(vUv,vec2(0.5,0.5)) + 0.25);
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // 圆环
  // float strength = step(0.5, distance(vUv,vec2(0.5)) + 0.35);
  // strength *= (1.0 - step(0.5, distance(vUv,vec2(0.5)) + 0.25));
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // 渐变圆环
  // float strength = abs(distance(vUv,vec2(0.5)) - 0.35);
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // 圆环2
  // float strength = step(0.1,abs(distance(vUv,vec2(0.5)) - 0.35));
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // 标靶
  // float strength = step(0.1,abs(distance(vUv,vec2(0.5)) - 0.35));
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // 圆环2
  // float strength = 1.0 - step(0.1,abs(distance(vUv,vec2(0.5)) - 0.35));
  // gl_FragColor = vec4(strength, strength, strength, 1.0);
  
  // 波浪圆环
  // vec2 waveUv = vec2(
  //   vUv.x,
  //   vUv.y + sin(vUv.x * 30.0) * 0.1
  // );
  // float strength = 1.0 - step(0.01,abs(distance(waveUv,vec2(0.5)) - 0.25));
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // 一滩水
  // vec2 waveUv = vec2(
  //   vUv.x + sin(vUv.y * 30.0) * 0.1,
  //   vUv.y + sin(vUv.x * 30.0) * 0.1
  // );
  // float strength = 1.0 - step(0.01,abs(distance(waveUv,vec2(0.5)) - 0.25));
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // 螺旋渐变
  // float alpha = 1.0 - step(0.5, distance(vUv,vec2(0.5)));
  // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
  // float strength = (angle + 3.14) / 6.28;
  // gl_FragColor = vec4(strength, strength, strength, alpha);

  // 雷达
  // float alpha = 1.0 - step(0.5, distance(vUv,vec2(0.5)));
  // vec2 rotateUv = rotate(vUv, -uTime * 5.0,vec2(0.5));
  // float angle = atan(rotateUv.x - 0.5, rotateUv.y - 0.5);
  // float strength = (angle + 3.14) / 6.28;
  // gl_FragColor = vec4(strength, strength, strength, alpha);

  // 光芒
  // float angle = atan(vUv.x - 0.5, vUv.y - 0.5)/PI;
  // float strength = mod(angle*10.0, 1.0);
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // 噪音
  // float strength = noise(vUv * 10.0);
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // 奶牛斑
  // float strength = step(uScale,noise(vUv * 10.0 + uTime));
  // gl_FragColor = vec4(strength, strength, strength, 1.0);
  
  // 奶牛斑
  float strength = 1.0 - abs(noise(vUv * 10.0));
  gl_FragColor = vec4(strength, strength, strength, 1.0);
} 