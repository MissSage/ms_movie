<template>
  <ElContainer>
    <el-menu
      :mode="'vertical'"
      class="el-menu-vertical-demo"
      :collapse="store.layout.collapse"
      :router="true"
      :default-active="router.currentRoute.value.path"
    >
      <template v-for="cMenu in routes" :key="cMenu.path">
        <menu-item v-if="!cMenu.meta?.notMenu" :menu="cMenu"></menu-item>
      </template>
    </el-menu>
    <el-container>
      <el-header>
        <css-doodle
          click-to-update
          use="var(--container),var(--flowers)"
        ></css-doodle>
        <div class="header-wrapper">
          <Icon
            :title="store.layout.collapse ? '展开菜单' : '折叠菜单'"
            class="hamburger"
            :class="{ collapse: store.layout.collapse }"
            @click="store.layout.Toggle_Collapse"
            icon="quill:hamburger"
          >
          </Icon>
        </div>
      </el-header>
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
  </ElContainer>
</template>
<script setup lang="ts">
import "css-doodle";
import { RouterView } from "vue-router";
import router, { routes } from "../../router";
import MenuItem from "@/components/MenuItem.vue";
import store from "@/store";
import { Icon } from "@iconify/vue";
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}

.el-main {
  padding: 0;
}

.el-header {
  --el-header-padding: 0;
  --el-header-height: 40px;
  display: flex;
  align-items: center;
  overflow: hidden;

  .header-wrapper {
    padding: 0 12px;
    position: absolute;
  }
}

.hamburger {
  cursor: pointer;
}

.collapse {
  transform: rotate(90deg);
}

css-doodle {
  --container: (
    : doodle {@grid: 20x1; @size: 100vmax 40px; background: #0a0c27;}
  );
  --flowers: (
    @shape: clover 5; background: hsla(calc(360 - @i * 4), 70%, 68%, @r.8) ;
      transform: scale(@r (0.2, 1.5)) translate(@m2. @r (±50%)) ;
  );
}
</style>
