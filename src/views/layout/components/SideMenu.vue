<template>
  <div
    class="menu-aside"
    :style="{
      width: state.width + 'px',
    }"
  >
    <el-menu
      :mode="'vertical'"
      :router="true"
      :collapse="store.layout.collapse"
      :default-active="router.currentRoute.value.path"
    >
      <template v-for="cMenu in routes" :key="cMenu.path">
        <menu-item v-if="!cMenu.meta?.notMenu" :menu="cMenu"></menu-item>
      </template>
    </el-menu>
    <div class="drag-line" @mousedown="handleMouseDown"></div>
  </div>
</template>
<script lang="ts" setup>
import router, { routes } from '@/router'
import store from '@/store'
const emit = defineEmits(['resize'])
const state = reactive<{
  isDraging: boolean
  width: number
  offsetX: number
}>({
  isDraging: false,
  width: 200,
  offsetX: 0,
})
const handleMouseDown = () => {
  state.isDraging = true
}
const handleMouseMove = (e: MouseEvent) => {
  if (state.isDraging) {
    console.log(e)
    state.width = e.clientX
    if (state.width < 100) {
      state.width = 4
    }
    emit('resize', state.width)
  }
}
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', () => {
    state.isDraging = false
  })
})
</script>
<style lang="scss" scoped>
@import '@/assets/styles/mixin.scss';
.menu-aside {
  height: 100%;
  width: 200px;
  position: relative;
  overflow: hidden;
  .el-menu {
    width: 100%;
    min-width: 200px;
    height: 100%;
    overflow-y: auto;
    @include hideScrollBar;
  }
  .drag-line {
    position: absolute;
    right: 0;
    top: 0;
    width: 4px;
    height: 100%;

    &:hover {
      box-shadow: 0 0 1 inset;
      cursor: col-resize;
    }
  }
}
</style>
