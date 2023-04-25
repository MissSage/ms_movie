import { RouteRecordRaw } from 'vue-router'

export const threejsRoutes: RouteRecordRaw = {
  meta: {
    title: 'ThreeJS',
    icon: 'mdi:cross-bolnisi',
  },
  name: 'ThreeJS',
  path: '/ThreeJS',
  redirect: '/MyHome',
  component: () => import('@/views/pages/ThreeJS/index.vue'),
  children: [
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
    {
      meta: {
        title: '漫天雪花',
        notMenu: true,
        icon: 'mdi:cross-bolnisi',
      },
      name: 'Points',
      path: '/Points',
      component: () => import('@/views/pages/ThreeJS/Particles/Points.vue'),
    },
    {
      meta: {
        title: '银河',
        notMenu: true,
        icon: 'mdi:cross-bolnisi',
      },
      name: 'Galaxy',
      path: '/Galaxy',
      component: () => import('@/views/pages/ThreeJS/Particles/Galaxy.vue'),
    },
    {
      meta: {
        title: '鼠标交互',
        notMenu: true,
        icon: 'mdi:cross-bolnisi',
      },
      name: 'MouseCapture',
      path: '/MouseCapture',
      component: () => import('@/views/pages/ThreeJS/Intersection/MouseCapture.vue'),
    },
    {
      meta: {
        title: '我的3D首页',
        notMenu: true,
        icon: 'mdi:cross-bolnisi',
      },
      name: 'MyHome',
      path: '/MyHome',
      component: () => import('@/views/pages/ThreeJS/ScrollPages/MyHome.vue'),
    },
  ],
}
