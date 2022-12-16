<template>
  <div class="home">
    <el-button :type="'primary'" @click="go('/pictures')">View Pictures</el-button>
    <el-button :type="'primary'" @click="go('/videos')">View Videos</el-button>
  </div>
</template>
<script lang="ts" setup>
import router from "../router"
const go = (path: string) => {
  router.push({
    path: path
  })
}
</script>
