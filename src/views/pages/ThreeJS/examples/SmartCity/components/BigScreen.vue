<template>
  <div id="bigScreen">
    <div class="header">老陈智慧城市管理系统平台</div>
    <div class="main">
      <div class="left">
        <div v-for="(item, key) in props.dataInfo" :key="key" class="cityEvent">
          <h3>
            <span>{{ item.name }}</span>
          </h3>
          <h1>
            <img :src="barSvg" class="icon" />
            <span>{{ toFixInt(item.number) }}（{{ item.unit }}）</span>
          </h1>
          <div class="footerBoder"></div>
        </div>
      </div>
      <div class="right">
        <div class="cityEvent list">
          <h3>
            <span>事件列表</span>
          </h3>
          <ul>
            <li
              v-for="(item, i) in props.eventList"
              :key="i"
              :class="{ active: currentActive == i }"
              @click="toggleEvent(i)"
            >
              <h1>
                <div>
                  <img class="icon" :src="imgs[item.name]" />
                  <span> {{ item.name }} </span>
                </div>
                <span class="time"> {{ item.time }} </span>
              </h1>
              <p>{{ item.type }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import barSvg from '../imgs/bar.svg'
const emit = defineEmits(['eventToggle'])
const props = defineProps<{ dataInfo: any; eventList: any }>()
const imgs: Record<string, string> = {
  电力: '/ThreeJS/Texures/images/bg/dianli.svg',
  火警: '/ThreeJS/Texures/images/bg/fire.svg',
  治安: '/ThreeJS/Texures/images/bg/jingcha.svg',
}

const toFixInt = (num: number) => {
  return num.toFixed(0)
}
const handleSpriteClick = (data: any) => {
  currentActive.value = data.i
}
const currentActive = ref<any>()
const toggleEvent = (i: any) => {
  currentActive.value = i
  emit('eventToggle', i)
}
defineExpose({
  handleSpriteClick,
})
</script>

<style scoped>
#bigScreen {
  width: 100%;
  height: 100%;
  position: absolute;

  left: 0;
  top: 0;
  pointer-events: none;
}

.header {
  /* width: 1920px;
        height: 100px; */

  width: 100%;
  height: 70px;
  background: url(../imgs/title.png) 0 0 / 100% 100% no-repeat;
  text-align: center;
  color: rgb(104, 245, 255);
  font-size: 28px;
}

.main {
  width: 100%;
  height: calc(100% - 70px);
  display: flex;
  justify-content: space-between;
}

.left {
  width: 400px;
  /* background-color: rgb(255,255,255,0.5); */
  background-image: url(../imgs/line_img.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}

.right {
  width: 400px;
  /* background-color: rgb(255,255,255,0.5); */
  background-image: url(../imgs/line_img.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}

.cityEvent {
  position: relative;
  width: 350px;
  margin-bottom: 50px;
  background-image: url(../imgs/bg_img03.png);
  background-repeat: repeat;
}

.cityEvent::before {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 0;
  top: 0;
  border-top: 4px solid rgb(34, 133, 247);
  border-left: 4px solid rgb(34, 133, 247);
  content: '';
  display: block;
}

.cityEvent::after {
  width: 40px;
  height: 40px;
  position: absolute;
  right: 0;
  top: 0;
  border-top: 4px solid rgb(34, 133, 247);
  border-right: 4px solid rgb(34, 133, 247);
  content: '';
  display: block;
}
.footerBorder {
  position: absolute;
  bottom: 0;
  bottom: 0;
  width: 350px;
  height: 40px;
}
.footerBorder::before {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 0;
  top: 0;
  border-bottom: 4px solid rgb(34, 133, 247);
  border-left: 4px solid rgb(34, 133, 247);
  content: '';
  display: block;
}

.footerBorder::after {
  width: 40px;
  height: 40px;
  position: absolute;
  right: 0;
  top: 0;
  border-bottom: 4px solid rgb(34, 133, 247);
  border-right: 4px solid rgb(34, 133, 247);
  content: '';
  display: block;
}

.icon {
  width: 40px;
  height: 40px;
}

h1 {
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 30px 30px;
  justify-content: space-between;
  font-size: 30px;
}
h3 {
  color: #fff;
  display: flex;
  align-items: center;
  padding: 30px 30px;
}

h1 > div {
  display: flex;
  align-items: center;
}
h1 span.time {
  font-size: 20px;
  font-weight: normal;
}

.cityEvent li > p {
  color: #eee;
  padding: 0 30px 30px;
}
.list h1 {
  padding: 10px 30px;
}
.cityEvent.list ul {
  pointer-events: auto;
  cursor: pointer;
}

.cityEvent li.active h1 {
  color: red;
}
.cityEvent li.active p {
  color: red;
}

ul,
li {
  list-style: none;
}
</style>
