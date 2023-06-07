import { RouteRecordRaw } from 'vue-router'

export const RoutesLeaflet: RouteRecordRaw = {
  meta: {
    title: 'Leaflet',
    icon: 'mdi:cross-bolnisi',
  },
  name: 'Leaflet',
  path: '/Leaflet',
  component: () => import('@/views/pages/LeafletMap/LeafletBasic.vue')
}
