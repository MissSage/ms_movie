<template>
  <label for="url">音乐资源：<input type="text" v-model="state.url" /></label>
  <label for="img">背景资源：<input type="text" v-model="state.img" /></label>
  <AudioWave :img="state.img" :url="state.url"></AudioWave>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import AudioWave from '../../../src/components/AudioWave.vue'

const state = reactive<{img: string; url: string}>({
  img: '',
  url: ''
})
</script>