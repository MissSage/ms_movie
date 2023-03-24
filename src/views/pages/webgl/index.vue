<template>
  <div class="wrapper">
    <el-select v-model="curAppName" @change="handleAppChange">
      <el-option v-for="(item, i) in appNames" :key="i" :label="item" :value="i"></el-option>
    </el-select>
    <div class="container">
      <canvas ref="refCanvas" width="800" height="600" style="background: lightgray"> </canvas>
      <div id="overlay">
        <div>
          FPS: <span>{{ fps }}</span>
        </div>
        <div>
          Tris: <span>{{ tris }}</span>
        </div>
        <div>
          Verts: <span>{{ verts }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Application } from '@/utils/webgl/common/Application'
import { MeshBuilderApplication } from '@/utils/webgl/demo/MeshBuilderApplication'
import { Q3BspApplication } from '@/utils/webgl/demo/Q3BspApplication'
import { Doom3Application } from '@/utils/webgl/demo/Doom3Application'
import { RotatingCubeApplication } from '@/utils/webgl/demo/RotatingCubeApplication'
import { CoordSystemApplication } from '@/utils/webgl/demo/CoordSystemApplicationDemo'
import { BasicWebGLApplication } from '@/utils/webgl/demo/BasicWebGLApplication'
import { MD5SkinedMeshApplication } from '@/utils/webgl/demo/MD5SkinedMeshApplication'
import { AsyncLoadTestApplication } from '@/utils/webgl/demo/AsyncLoadTestApplication'

const refCanvas = ref<HTMLCanvasElement>()
const curAppName = ref<number>(0)
let appNames: string[] = [
  '第3章：RotatingCubeApplication',
  '第3章：AsyncLoadTestApplication',
  '第4章：BasicWebGLApplication',
  '第7章：MeshBuilderApplication',
  '第7章：CoordSystemApplication',
  '第8章：Q3BspApplication',
  '第9章：Doom3Application',
  '第10章：MD5SkinedMeshApplication',
]

const Apps = [
  RotatingCubeApplication,
  AsyncLoadTestApplication,
  BasicWebGLApplication,
  MeshBuilderApplication,
  CoordSystemApplication,
  Q3BspApplication,
  Doom3Application,
  MD5SkinedMeshApplication,
]

function runApplication(index: number): void {
  if (!refCanvas.value) return
  const appConstructor = Apps[index]
  const app = new appConstructor(refCanvas.value)
  app.frameCallback = frameCallback
  app.run()
}

const fps = ref<string>('0')
const tris = ref<string>('0')
const verts = ref<string>('0')

const frameCallback = (app: Application) => {
  fps.value = String(app.fps.toFixed(0))
  tris.value = '0'
  verts.value = '0'
}

const handleAppChange = (): void => {
  if (!refCanvas.value) return
  runApplication(curAppName.value)
}
onMounted(() => {
  handleAppChange()
})
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
}
.container {
  position: relative;
}

#overlay {
  position: absolute;
  /*相对左上角*/
  left: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-family: monospace;
  padding: 1em;
}

#canvas2d {
  position: absolute;
  left: 0px;
  top: 0px;
}
</style>
