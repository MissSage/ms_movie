import { RouteRecordRaw } from 'vue-router'

export const RoutesSuperMap: RouteRecordRaw = {
  meta: {
    title: 'SuperMap',
    icon: 'mdi:cross-bolnisi',
  },
  name: 'SuperMap',
  path: '/SuperMap_iClient3D_VUE_for_WebGL',
  component: () => import('@/views/pages/SuperMap/SuperMap_iClient3D_VUE_for_WebGL.vue')
}
