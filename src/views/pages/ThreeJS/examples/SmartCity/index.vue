<template>
  <div class="home">
    <Scene :event-list="eventList"></Scene>
    <BigScreen
      :data-info="dataInfo"
      :event-list="eventList"
      @event-toggle="handleEventToggle"
    ></BigScreen>
  </div>
</template>

<script lang="ts" setup>
// @ is an alias to /src
import Scene from './components/Scene.vue'
import BigScreen from './components/BigScreen.vue'
// import { getSmartCityInfo, getSmartCityList } from '@/api/api'
// import gsap from 'gsap'
// console.log(testVertex)

const refScene = ref<InstanceType<typeof Scene>>()
const dataInfo = reactive<Record<string, any>>({
  iot: { number: 0 },
  event: { number: 0 },
  power: { number: 0 },
  test: { number: 0 },
})
const handleEventToggle = (index: any) => {
  refScene.value?.handleEventToggle(index)
}
onMounted(async () => {
  changeInfo()
  getEventList()
  setInterval(() => {
    changeInfo()
    getEventList()
  }, 10000)
})

const changeInfo = async () => {
  // let res = await getSmartCityInfo()
  // console.log(res);
  // dataInfo.iot = res.data.data.iot;
  // dataInfo.event = res.data.data.event;
  // dataInfo.power = res.data.data.power;
  // dataInfo.test = res.data.data.test;

  // for (let key in dataInfo) {
  //   dataInfo[key].name = res.data.data[key].name
  //   dataInfo[key].unit = res.data.data[key].unit
  //   gsap.to(dataInfo[key], {
  //     number: res.data.data[key].number,
  //     duration: 1,
  //   })
  // }

  // console.log(dataInfo);
}

const eventList = ref([])
const getEventList = async () => {
  // let result = await getSmartCityList()
  // eventList.value = result.data.list
  // console.log(result.data.list);
}
</script>
<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
