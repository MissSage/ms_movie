<template>
  <ElContainer>
    <ElAside>
      <RouterLink to="/">首页</RouterLink>
      <RouterLink to="/videos">视频</RouterLink>
    </ElAside>
    <el-container>
      <el-header>
        <RouterLink to="/add">创作</RouterLink>
      </el-header>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </ElContainer>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
</script>

<style scoped>
.el-container {
  height: 100%;
}
</style>
