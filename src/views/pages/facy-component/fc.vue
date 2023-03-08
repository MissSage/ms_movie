<template>
  <div class="box">
    <fc-wave-filter mode="alpha"
      ><img src="@/assets/vue.svg" alt=""
    /></fc-wave-filter>
    <fc-warp-btn text-align="center"></fc-warp-btn>
    <fc-three></fc-three>
    <fc-arrow-btn></fc-arrow-btn>
    <fc-underline-btn></fc-underline-btn>
    <fc-pixel-btn></fc-pixel-btn>
    <fc-dbl-warp-btn></fc-dbl-warp-btn>
    <fc-parentheses-btn></fc-parentheses-btn>
    <fc-round-btn></fc-round-btn>
    <fc-typing-input></fc-typing-input>
    <fc-bubbles click active="true">
      <fc-china></fc-china>
    </fc-bubbles>
  </div>
</template>
<script lang="ts" setup>
import {
  FcTypingInput,
  FcChina,
  FcBubbles,
  FcWaveFilter,
  FcWarpBtn,
  Fc3DBtn,
  FcArrowBtn,
  FcUnderlineBtn,
  FcPixelBtn,
  FcDblWarpBtn,
  FcParenthesesBtn,
  FcRoundBtn,
} from 'fancy-components'
new FcChina()
new FcBubbles()
new FcWaveFilter()
new FcWarpBtn()
new Fc3DBtn('fc-three')
new FcArrowBtn()
new FcUnderlineBtn()
new FcPixelBtn()
new FcDblWarpBtn()
new FcParenthesesBtn()
new FcRoundBtn()
new FcTypingInput()
</script>
<style>
fc-wave-filter {
  --color: red;
  --width: 100px;
  --height: 100px;
}

fc-china {
  --dur: 2.2s;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box > * {
  margin: 20px;
}
</style>
