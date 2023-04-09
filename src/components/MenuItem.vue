<!-- 
  meta: {
    childOnly: 只显示子级，隐藏本级
    notMenu: 不是菜单
    title: 标题
  }
  1. 是否是submenu
    1. 是否隐藏本级，只显示子级
    2. 是否从菜单中完全隐藏，即既不显示本级，也不显示子级
  3. 是否是group
 -->
<template>
  <template v-if="hasShowedChild(menu)">
    <template v-if="menu.meta?.childOnly">
      <template v-for="cMenu in menu.children" :key="cMenu.path">
        <menu-item v-if="!cMenu.meta?.notMenu" :menu="cMenu"></menu-item>
      </template>
    </template>
    <el-menu-item-group v-else-if="menu.meta?.isGroup">
      <template #title>
        <span>
          {{ menu.meta?.title }}
        </span>
      </template>
      <template v-for="cMenu in menu.children" :key="cMenu.path">
        <menu-item v-if="!cMenu.meta?.notMenu" :menu="cMenu"></menu-item>
      </template>
    </el-menu-item-group>
    <el-sub-menu v-else :index="menu.path">
      <template #title>
        <el-icon>
          <Icon v-if="menu.meta?.icon" :icon="menu.meta.icon?.toString()"></Icon>
        </el-icon>
        <span>
          {{ menu.meta?.title }}
        </span>
      </template>
      <template v-for="cMenu in menu.children" :key="cMenu.path">
        <menu-item v-if="!cMenu.meta?.notMenu" :menu="cMenu"></menu-item>
      </template>
    </el-sub-menu>
  </template>
  <el-menu-item v-else-if="!menu.meta?.hidden" :index="menu.path">
    <el-icon>
      <Icon v-if="menu.meta?.icon" :icon="menu.meta.icon?.toString()"></Icon>
    </el-icon>
    <template #title>
      <span>
        {{ menu.meta?.title }}
      </span>
    </template>
  </el-menu-item>
</template>
<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router'
import { Icon } from '@iconify/vue'
defineProps<{
  menu: RouteRecordRaw
}>()
const hasShowedChild = (menu: RouteRecordRaw) => {
  if (!menu.children?.length) return false
  return menu.children.filter((item) => item.meta?.notMenu !== true).length > 0
}
</script>
