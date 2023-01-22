<template>
  <div class="img-gallary">
    <div class="img-item" v-for="(item, index) in dataList" :key="index"
      :style="{ width: '200px', left: state.imgLefts[index] + 'px', top: state.imgTops[index] + 'px' }">
      <el-image class="image" :src="item.img" :alt="item.title" @load="init(index)">
        <template #error>
          <div class="image-slot">
            <el-icon>
              <Icon icon="mdi:picture-in-picture-bottom-right"></Icon>
            </el-icon>
          </div>
        </template>
      </el-image>
      <div class="title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { Icon } from '@iconify/vue'
defineProps<{
  dataList: any[]
}>()
const state = reactive<{
  imgLefts: number[]
  imgHeights: number[]
  imgTops: number[]
  top: number
}>({
  imgLefts: [],
  imgHeights: [],
  imgTops: [],
  top: 20
})
const init = async (index: number) => {
  debugger
  const winwidth = document.querySelector('.img-gallary')?.clientWidth||0
  const num = Math.floor(winwidth / 220)
  // console.log(num);
  // for (let index = 0; index < emit.yui.length; index++) {
  if (index < num) {
      state.imgLefts[index] = index * (200 + 20)
      let bili = (document.querySelector(`.img-item :nth-child(${index + 1})`) as HTMLImageElement)?.naturalWidth / 200
      state.imgHeights[index] = (document.querySelector(`.img-item :nth-child(${index + 1})`) as HTMLImageElement).naturalHeight / bili + state.top
      state.imgTops[index] = 0
  } else {
    // 记录最小高度
    let minheight: any = state.imgHeights[0]
    // 记录最小索引
    let minindex: number = 0
    // console.log(imgheight.value);
    for (let i = 0; i < num; i++) {
      if (state.imgHeights[i] < minheight) {
        minheight = state.imgHeights[i]
        minindex = i
      }
    }
    state.imgLefts[index] = minindex * (200 + 20)
    let bili = (document.querySelector(`.img-item :nth-child(${index + 1})`) as HTMLImageElement)?.naturalWidth / 200
    state.imgTops[index] = state.imgHeights[minindex]
    state.imgHeights[minindex] = (document.querySelector(`.img-item :nth-child(${index + 1})`) as HTMLImageElement)?.naturalHeight / bili + minheight + state.top
  }
  // }
}
</script>
<style lang="scss" scoped>
.img-gallary{
  position: relative;
}
.img-item {
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
