import { RouteRecordRaw } from 'vue-router'

export const RoutesThree: RouteRecordRaw = {
  meta: {
    title: 'ThreeJS',
    icon: 'mdi:cross-bolnisi',
  },
  name: 'ThreeJS',
  path: '/ThreeJS',
  children: [
    {
      meta: {
        // notMenu: true,
        title: 'Demo',
        icon: 'mdi:cross-bolnisi',
      },
      name: 'ThreeJSExamples',
      path: '/ThreeJSExamples',
      component: () =>
        import('@/views/pages/ThreeJS/components/ThreeBasic.vue'),
      children: [
        {
          meta: {
            // notMenu: true,
            title: 'Hello Three',
            icon: 'mdi:cross-bolnisi',
          },
          name: 'QuickStart',
          path: '/QuickStart',
          component: () =>
            import('@/views/pages/ThreeJS/examples/01_quick_start.vue'),
        },
        {
          meta: {
            // notMenu: true,
            title: '材质和纹理',
            icon: 'mdi:cross-bolnisi',
          },
          name: 'Materia',
          path: '/Materia',
          component: () =>
            import('@/views/pages/ThreeJS/examples/02_material_texture.vue'),
        },
        {
          meta: {
            // notMenu: true,
            title: '平行光',
            icon: 'mdi:cross-bolnisi',
          },
          name: 'DirectionalLight',
          path: '/DirectionalLight',
          component: () =>
            import('@/views/pages/ThreeJS/examples/03_directional_light.vue'),
        },
        {
          meta: {
            // notMenu: true,
            title: '聚光灯',
            icon: 'mdi:cross-bolnisi',
          },
          name: 'AmbientLight',
          path: '/AmbientLight',
          component: () =>
            import('@/views/pages/ThreeJS/examples/04_ambient_light.vue'),
        },
        {
          meta: {
            // notMenu: true,
            title: '跳动的小球',
            icon: 'mdi:cross-bolnisi',
          },
          name: 'JumpingBall',
          path: '/JumpingBall',
          component: () =>
            import('@/views/pages/ThreeJS/examples/05_jumping_ball.vue'),
        },
        {
          meta: {
            title: '漫天雪花',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: 'Snow',
          path: '/Snow',
          component: () => import('@/views/pages/ThreeJS/examples/06_snow.vue'),
        },
        {
          meta: {
            title: '银河',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: 'Galaxy',
          path: '/Galaxy',
          component: () =>
            import('@/views/pages/ThreeJS/examples/07_galaxy.vue'),
        },
        {
          meta: {
            title: '鼠标交互',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: 'MouseCapture',
          path: '/MouseCapture',
          component: () =>
            import('@/views/pages/ThreeJS/examples/08_mouse_capture.vue'),
        },
        {
          meta: {
            title: '3D首页',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: 'MyHome',
          path: '/MyHome',
          component: () =>
            import('@/views/pages/ThreeJS/examples/09_3d_home_page.vue'),
        },
        {
          meta: {
            title: '金属球体碰撞桌面',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: 'CannonContact',
          path: '/CannonContact',
          component: () =>
            import('@/views/pages/ThreeJS/examples/10_drop_ball.vue'),
        },
        {
          meta: {
            title: '金属广场碰撞旋转',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: 'CannonRotate',
          path: '/CannonRotate',
          component: () =>
            import('@/views/pages/ThreeJS/examples/11_cannon_rotate.vue'),
        },
        {
          meta: {
            title: '基于webgl的三角形',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: 'WebglTriangle',
          path: '/WebglTriangle',
          component: () =>
            import('@/views/pages/ThreeJS/examples/12_webgl_triangle.vue'),
        },
        {
          meta: {
            title: '着色器编程',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: 'WebglShader',
          path: '/WebglShader',
          component: () =>
            import('@/views/pages/ThreeJS/examples/13_webgl_shader.vue'),
        },
        {
          meta: {
            title: '原始着色器',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: 'RawShaderMaterial',
          path: '/RawShaderMaterial',
          component: () =>
            import('@/views/pages/ThreeJS/examples/14_raw_shader_material.vue'),
        },
        {
          meta: {
            title: '波纹效果',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: 'WaveShaderMaterial',
          path: '/WaveShaderMaterial',
          component: () =>
            import(
              '@/views/pages/ThreeJS/examples/15_wave_shader_material.vue'
            ),
        },
        {
          meta: {
            title: '效果与函数',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: 'ShaderDeepStudy',
          path: '/ShaderDeepStudy',
          component: () =>
            import('@/views/pages/ThreeJS/examples/16_shader_deep_study.vue'),
        },
        {
          meta: {
            title: '水波',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: 'Water',
          path: '/Water',
          component: () =>
            import('@/views/pages/ThreeJS/examples/17_water.vue'),
        },
        {
          meta: {
            title: '水池',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: 'Pool',
          path: '/Pool',
          component: () => import('@/views/pages/ThreeJS/examples/18_pool.vue'),
        },
        {
          meta: {
            title: '三维地图',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: 'ThreeMap3D',
          path: '/ThreeMap3D',
          component: () =>
            import('@/views/pages/ThreeJS/examples/3DMap/Map3D.vue'),
        },
        {
          meta: {
            title: '几何体顶点与索引',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: '19_geometry_vertices_indexes',
          path: '/19_geometry_vertices_indexes',
          component: () =>
            import('@/views/pages/ThreeJS/examples/19_geometry_vertices_indexes.vue'),
        },
        {
          meta: {
            title: '几何体顶点分组与材质',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: '20_geometry_vertices_materials',
          path: '/20_geometry_vertices_materials',
          component: () =>
            import('@/views/pages/ThreeJS/examples/20_geometry_vertices_materials.vue'),
        },
        {
          meta: {
            title: '基础材质纹理贴图使用',
            // notMenu: true,
            icon: 'mdi:cross-bolnisi',
          },
          name: '21_basic_material_texture',
          path: '/21_basic_material_texture',
          component: () =>
            import('@/views/pages/ThreeJS/examples/21_basic_material_texture.vue'),
        },
      ],
    },
    {
      meta: {
        title: '智慧城市',
        // notMenu: true,
        icon: 'mdi:cross-bolnisi',
      },
      name: 'ThreeSmartCity',
      path: '/ThreeSmartCity',
      component: () =>
        import('@/views/pages/ThreeJS/examples/SmartCity/index.vue'),
    },
  ],
}
