<template>
  <div class="dashboard">
    <div class="main" @click="state.collapsed = true">
      <slot></slot>
    </div>
    <div class="aside" :class="state.collapsed ? 'collapsed' : ''">
      <slot name="aside"></slot>
      <div class="aside-bar" @click="state.collapsed = !state.collapsed">
        <Icon class="bar-icon" :icon="state.collapsed ? 'ep:caret-right' : 'ep:caret-left'"></Icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const state = reactive<{ collapsed: boolean }>({
  collapsed: true,
})
</script>
<style lang="scss" scoped>
.dashboard {
  width: 100%;
  height: 100%;
  position: relative;
  .main {
    width: 100%;
    height: 100%;
  }
  .aside {
    background-color: rgb(159, 182, 211);
    position: absolute;
    width: 300px;
    height: 100%;
    overflow-y: auto;
    overflow-y: overlay;
    left: 0;
    top: 0;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.25);
    overflow: visible;
    transition: all 0.5s ease-in-out;
    &.collapsed {
      left: -300px;
    }
    .aside-bar {
      content: '';
      position: absolute;
      background-color: rgb(159, 182, 211);
      width: 20px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      right: -20px;
      border-radius: 0 100px 100px 0;
      cursor: pointer;
      box-shadow: 1px 0 2px 1px rgb(159, 182, 211);
    }
  }
}
</style>
