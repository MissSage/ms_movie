import { RouteRecordRaw } from 'vue-router'

export const RoutesThree: RouteRecordRaw = {
  meta: {
    title: 'ThreeJS',
    icon: 'mdi:cross-bolnisi',
  },
  name: 'ThreeJS',
  path: '/ThreeJS',
  redirect: '/ShaderDeepStudy',
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
      component: () =>
        import('@/views/pages/ThreeJS/MaterialAndTexture/index.vue'),
    },
    {
      meta: {
        notMenu: true,
        title: '平行光',
        icon: 'mdi:cross-bolnisi',
      },
      name: 'DirectionalLight',
      path: '/DirectionalLight',
      component: () =>
        import('@/views/pages/ThreeJS/LightAndShadow/DirectionalLight.vue'),
    },
    {
      meta: {
        notMenu: true,
        title: '聚光灯',
        icon: 'mdi:cross-bolnisi',
      },
      name: 'AmbientLight',
      path: '/AmbientLight',
      component: () =>
        import('@/views/pages/ThreeJS/LightAndShadow/AmbientLight.vue'),
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
      component: () =>
        import('@/views/pages/ThreeJS/Intersection/MouseCapture.vue'),
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
    {
      meta: {
        title: '金属球体碰撞桌面',
        notMenu: true,
        icon: 'mdi:cross-bolnisi',
      },
      name: 'CannonContact',
      path: '/CannonContact',
      component: () => import('@/views/pages/ThreeJS/Engine/CannonContact.vue'),
    },
    {
      meta: {
        title: '金属广场碰撞旋转',
        notMenu: true,
        icon: 'mdi:cross-bolnisi',
      },
      name: 'CannonRotate',
      path: '/CannonRotate',
      component: () => import('@/views/pages/ThreeJS/Engine/CannonRotate.vue'),
    },
    {
      meta: {
        title: '基于webgl的三角形',
        notMenu: true,
        icon: 'mdi:cross-bolnisi',
      },
      name: 'WebglTriangle',
      path: '/WebglTriangle',
      component: () => import('@/views/pages/ThreeJS/Engine/WebglTriangle.vue'),
    },
    {
      meta: {
        title: '着色器编程',
        notMenu: true,
        icon: 'mdi:cross-bolnisi',
      },
      name: 'WebglShader',
      path: '/WebglShader',
      component: () => import('@/views/pages/ThreeJS/Engine/WebglShader.vue'),
    },
    {
      meta: {
        title: '原始着色器',
        notMenu: true,
        icon: 'mdi:cross-bolnisi',
      },
      name: 'RawShaderMaterial',
      path: '/RawShaderMaterial',
      component: () => import('@/views/pages/ThreeJS/Engine/RawShaderMaterial.vue'),
    },
    {
      meta: {
        title: '波纹效果',
        notMenu: true,
        icon: 'mdi:cross-bolnisi',
      },
      name: 'WaveShaderMaterial',
      path: '/WaveShaderMaterial',
      component: () => import('@/views/pages/ThreeJS/Engine/WaveShaderMaterial.vue'),
    },
    {
      meta: {
        title: '效果与函数',
        notMenu: true,
        icon: 'mdi:cross-bolnisi',
      },
      name: 'ShaderDeepStudy',
      path: '/ShaderDeepStudy',
      component: () => import('@/views/pages/ThreeJS/Engine/ShaderDeepStudy.vue'),
    },
  ],
}
