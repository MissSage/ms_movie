import { RouteRecordRaw } from 'vue-router'
import { threejsRoutes } from './threejs'

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
      {
        meta: {
          title: 'webgl',
          icon: 'mdi:cross-bolnisi',
        },
        name: 'webgl',
        path: '/webgl3D',
        component: () => import('@/views/pages/webgl/index.vue'),
      },
      threejsRoutes,
    ],
  },
]

export default routes
