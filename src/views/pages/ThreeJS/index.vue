<template>
  <DashBoard>
    <template #aside>
      <ul>
        <router-link v-for="(item, i) in list" :key="i" :to="item.path">
          <li>
            <Icon v-if="item.meta?.icon" :icon="(item.meta.icon as string)"></Icon>
            {{ item.meta?.title }}
          </li>
        </router-link>
      </ul>
    </template>
    <router-view></router-view>
  </DashBoard>
</template>
<script lang="ts" setup>
import DashBoard from './components/DashBoard.vue'
import { threejsRoutes } from '@/router/modules/threejs'
import { Icon } from '@iconify/vue'
const list = computed(() => {
  return threejsRoutes.children
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
