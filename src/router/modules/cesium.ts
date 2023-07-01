import { RouteRecordRaw } from 'vue-router'

export const RoutesCesium: RouteRecordRaw = {
  meta: {
    title: 'cesium',
    icon: 'mdi:cross-bolnisi',
  },
  path: 'cesium',
  name: '/cesium',
  redirect: '/RoutesCesium',
  children: [
    {
      meta: {
        title: 'cesium基础',
        icon: 'mdi:cross-bolnisi',
      },
      name: 'CesiumBasic',
      path: '/RoutesCesium',
      component: () => import('@/views/pages/cesium/CesiumBasic/index.vue'),
    },
    {
      meta: {
        title: '智慧城市',
        icon: 'mdi:cross-bolnisi',
      },
      name: 'SmartCity',
      path: '/SmartCity',
      component: () => import('@/views/pages/cesium/SmartCity/index.vue'),
    },
  ],
}
