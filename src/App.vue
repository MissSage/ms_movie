<template>
  <el-config-provider :locale="zhCn">
    <RouterView></RouterView>
  </el-config-provider>
</template>
<script setup lang="ts">
import { zhCn } from "element-plus/es/locales"
import { RouterView } from "vue-router"
</script>

<style scoped>
.el-container {
  height: 100%;
}
</style>
