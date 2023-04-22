import { RouteRecordRaw } from 'vue-router'

export const threejsRoutes: RouteRecordRaw = {
  meta: {
    title: 'ThreeJS',
    icon: 'mdi:cross-bolnisi',
  },
  name: 'ThreeJS',
  path: '/ThreeJS',
  redirect: '/Points',
  component: () => import('@/views/pages/ThreeJS/index.vue'),
  children: [
    {
      meta: {
        title: '球与粒子',
        notMenu: true,
        icon: 'mdi:cross-bolnisi',
      },
      name: 'Points',
      path: '/Points',
      component: () => import('@/views/pages/ThreeJS/Particles/Points.vue'),
    },
    {
      meta: {
        notMenu: true,
        title: '材质和纹理',
        icon: 'mdi:cross-bolnisi',
      },
      name: 'Materia',
      path: '/Materia',
      component: () => import('@/views/pages/ThreeJS/MaterialAndTexture/index.vue'),
    },
    {
      meta: {
        notMenu: true,
        title: '平行光',
        icon: 'mdi:cross-bolnisi',
      },
      name: 'DirectionalLight',
      path: '/DirectionalLight',
      component: () => import('@/views/pages/ThreeJS/LightAndShadow/DirectionalLight.vue'),
    },
    {
      meta: {
        notMenu: true,
        title: '聚光灯',
        icon: 'mdi:cross-bolnisi',
      },
      name: 'AmbientLight',
      path: '/AmbientLight',
      component: () => import('@/views/pages/ThreeJS/LightAndShadow/AmbientLight.vue'),
    },
  ],
}
