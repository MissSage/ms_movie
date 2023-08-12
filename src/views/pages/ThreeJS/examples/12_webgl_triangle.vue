<template>
  <div ref="refDiv" class="canvas-box">
    <canvas id="canvas" ref="refCanvas"></canvas>
  </div>
</template>
<script lang="ts" setup>
const refDiv = ref<HTMLDivElement>()
const refCanvas = ref<HTMLCanvasElement>()

// 获取 webgl绘图上下文
onMounted(() => {
  if (!refCanvas.value || !refDiv.value) return
  refCanvas.value.width = refDiv.value.clientWidth
  refCanvas.value.height = refDiv.value.clientHeight
  const gl = refCanvas.value.getContext('webgl')
  if (!gl) return
  // 第一次创建webgl上下文需要设置视口大小
  gl.viewport(0, 0, refCanvas.value.width, refCanvas.value.height)

  // 创建顶点着色器
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)
  if (!vertexShader) return
  // 创建顶点着色器的源码，需要编写glsl代码
  // ** 注意行尾的分号一定要写，不然会报错 **
  gl.shaderSource(
    vertexShader,
    `
    attribute vec4 a_Position;
    uniform mat4 u_Mat;
    varying vec4 v_Color;
    void main() {
      gl_Position = u_Mat * a_Position;
      v_Color = gl_Position;
    }
  `,
  )
  // 编译顶点着色器
  gl.compileShader(vertexShader)
  // 创建片元着色器
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
  if (!fragmentShader) return
  // 创建片元着色器的源码， 需要编写glsl代码
  gl.shaderSource(
    fragmentShader,
    `
    precision mediump float;
    varying vec4 v_Color;
    void main() {
      gl_FragColor = v_Color;
    }
  `,
  )
  // 编译片元着色器
  gl.compileShader(fragmentShader)
  // 创建程序连接顶点着色器和片元着色器
  const program = gl.createProgram()
  if (!program) return
  // 链接顶点着色器和片元着色器
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  // 链接程序
  gl.linkProgram(program)
  // 使用程序进行渲染
  gl.useProgram(program)

  // 创建顶点缓冲区对象
  const vertexBuffer = gl.createBuffer()
  // 绑定顶点缓冲区对象
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  // 向顶点缓冲区写入数据
  const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
  // gl.STATIC_DRAW表示静态，数据不会经常改变，gl.DYNAMIC_DARAW表示动态
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  // 获取顶点着色器中的a_Position变量的位置
  const a_Position = gl.getAttribLocation(program, 'a_Position')
  // 将顶点缓冲区对象分配给a_Position变量
  // 告诉openGL如何 解析顶点数据
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
  // 启用顶点着色器中的a_Position变量
  gl.enableVertexAttribArray(a_Position)

  let scale = 1
  let requestId = -1
  // prettier-ignore
  // const mat = new Float32Array([
  //   scale, 0.0, 0.0, 0.0,
  //   0.0, scale, 0.0, 0.0,
  //   0.0, 0.0, scale, 0.0,
  //   0.0, 0.0, 0.0, 1.0,
  // ])
  // const u_Mat = gl.getUniformLocation(program, 'u_Mat')
  // gl.uniformMatrix4fv(u_Mat, false, mat)

  // // 清空颜色
  // // prettier-ignore
  // gl.clearColor(
  //   0.0, 0.0,
  //   0.0, 0.0
  // )
  // // 清空颜色Buffer
  // gl.clear(gl.COLOR_BUFFER_BIT)

  // // 绘制三角形
  // gl.drawArrays(gl.TRIANGLES, 0, 3)
  const animate = () => {
    if(scale<-1) {
      cancelAnimationFrame(requestId)
      return
    }
    scale -= 0.01
    // prettier-ignore
    const mat = new Float32Array([
      scale, 0.0, 0.0, 0.0,
      0.0, scale, 0.0, 0.0,
      0.0, 0.0, scale, 0.0, 
      0.0, 0.0, 0.0, 1.0,
    ])
    // 拿到程序的uMat变量
    const u_Mat = gl.getUniformLocation(program, 'u_Mat')
    // 把mat作为u_Mat这个参数传给程序
    gl.uniformMatrix4fv(u_Mat, false, mat)
    // 绘制三角形
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    requestId = requestAnimationFrame(animate)
  }
  animate()
})
</script>
<style lang="scss" scoped>
.canvas-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>
