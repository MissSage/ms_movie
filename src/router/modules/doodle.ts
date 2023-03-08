import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    meta: {
      title: 'css-doodle',
      icon: 'mdi:cross-bolnisi',
    },
    path: '/doodle',
    redirect: '/doodle-use',
    children: [
      {
        meta: {
          title: 'doodle-use',
          icon: 'mdi:cross-bolnisi',
        },
        name: 'doodle-use',
        path: '/doodle-use',
        component: () => import('@/views/pages/doodle/use.vue'),
      },
      {
        meta: {
          title: 'doodle-shape',
          icon: 'mdi:cross-bolnisi',
        },
        name: 'doodle-shape',
        path: '/doodle-shape',
        component: () => import('@/views/pages/doodle/shape.vue'),
      },
      {
        meta: {
          title: 'doodle-flowers',
          icon: 'mdi:cross-bolnisi',
        },
        name: 'doodle-flowers',
        path: '/doodle-flowers',
        component: () => import('@/views/pages/doodle/flowers.vue'),
      },
    ],
  },
]

export default routes
