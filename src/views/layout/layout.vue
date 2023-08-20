<template>
  <div class="layout" :style="state.styleObj">
    <SideMenu @resize="handleMenuResize"></SideMenu>
    <el-container class="layout-main">
      <el-main>
        <router-view v-slot="{ Component }">
          <KeepAlive :include="['movie']">
            <transition name="fade">
              <component :is="Component" />
            </transition>
          </KeepAlive>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import 'css-doodle'
import { RouterView } from 'vue-router'
import SideMenu from './components/SideMenu.vue'
import HeadMenu from './components/HeadMenu.vue'

const state = reactive<{ styleObj: any }>({
  styleObj: {
    '--menu-width': '200px',
  },
})
const handleMenuResize = (width: number) => {
  state.styleObj['--menu-width'] = width + 'px'
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  user-select: none;
  display: flex;
}
.layout-main {
  width: calc(100% - var(--menu-width));
  overflow: auto;
  overflow: overlay;
}
.el-main {
  padding: 0;
}
</style>
