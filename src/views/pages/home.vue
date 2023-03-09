<template>
  <div class="home">{{ vitePort }}</div>
</template>
<script lang="ts" setup>
const vitePort = ref(import.meta.env.VITE_PORT)
</script>
