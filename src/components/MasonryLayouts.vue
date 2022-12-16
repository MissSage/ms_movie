<template>
  <div class="itemsbox">
    <div class="items" v-for="(item, index) in dataList" :key="index" :style="{ width: '200px', minHeight: '260px', left: lefts[index] + 'px', top: imgtop[index] + 'px' }">
      <el-image class="image" :src="item.img" :alt="item.title" @load="init(index)">
        <template #error>
          <div class="image-slot">
            <el-icon><icon-picture /></el-icon>
          </div>
        </template>
      </el-image>
      <div class="title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
defineProps<{
  dataList: any[]
}>()
let lefts = ref<any>([])
let imgheight: number[] = []
let imgtop = ref<any>([])
const top: any = 20
const init = async (index: number) => {
  console.log(index)
  const winwidth = document.body.clientWidth
  const num = Math.floor(winwidth / 220)
  // console.log(num);
  // for (let index = 0; index < emit.yui.length; index++) {
  if (index < num) {
    if (index < num) {
      lefts.value[index] = index * (200 + 20)
      let bili = (document.querySelector(`.itemsbox :nth-child(${index + 1})`) as HTMLImageElement).naturalWidth / 200
      imgheight[index] = (document.querySelector(`.itemsbox :nth-child(${index + 1})`) as HTMLImageElement).naturalHeight / bili + top
      imgtop.value[index] = 0
    }
  } else {
    let minheight: any = imgheight[0]
    let minindex: number = 0
    // console.log(imgheight.value);
    for (let i = 0; i < num; i++) {
      if (imgheight[i] < minheight) {
        minheight = imgheight[i]
        minindex = i
      }
    }
    lefts.value[index] = minindex * (200 + 20)
    let bili = (document.querySelector(`.itemsbox :nth-child(${index + 1})`) as HTMLImageElement).naturalWidth / 200
    imgtop.value[index] = imgheight[minindex]
    imgheight[minindex] = (document.querySelector(`.itemsbox :nth-child(${index + 1})`) as HTMLImageElement).naturalHeight / bili + minheight + top
  }
  // }
}
</script>
<style lang="scss" scoped>
.items {
  position: absolute;
}
.el-image {
  width: 100%;
  height: calc(100% - 30px);
}
.image-slot {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
</style>
