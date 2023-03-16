import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    meta: {
      title: 'webgl',
      icon: 'gis:earth',
    },
    path: '/webgl',
    redirect: '/arcgis',
    children: [
      {
        meta: {
          title: 'arcgis',
          icon: 'mdi:cross-bolnisi',
        },
        name: 'ArcgisMap',
        path: '/arcgis',
        component: () => import('@/views/pages/arcgis/ArcgisMap.vue'),
      },
    ],
  },
]

export default routes
