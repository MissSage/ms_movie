<template>
  <DashBoard>
    <template #aside>
      <ul class="aside-menu">
        <router-link v-for="(item, i) in list" :key="i" :to="item.path">
          <li class="aside-menu-item">
            <Icon v-if="item.meta?.icon" :icon="(item.meta.icon as string)"></Icon>
            <span class="aside-menu-item__label">
              {{ item.meta?.title }}
            </span>
          </li>
        </router-link>
      </ul>
    </template>
    <router-view></router-view>
  </DashBoard>
</template>
<script lang="ts" setup>
import DashBoard from './components/DashBoard.vue'
import { RoutesThree } from '@/router/modules/threejs'
import { Icon } from '@iconify/vue'
const list = computed(() => {
  return RoutesThree.children
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
  position: relative;
}
.aside-menu {
  .aside-menu-item {
    line-height: 32px;
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    .aside-menu-item__label {
      margin-left: 12px;
    }
  }
}
</style>
