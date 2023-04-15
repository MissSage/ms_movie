import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    meta: {
      title: '媒体',
      icon: 'mdi:movie-roll',
    },
    path: '/media',
    redirect: '/movie/index',
    children: [
      {
        meta: {
          title: '视频',
          icon: 'mdi:movie-roll',
        },
        name: 'movieIndex',
        path: '/movie/index',
        component: () => import('@/views/pages/movies/movies.vue'),
      },
      {
        meta: {
          title: '音乐',
          icon: 'mdi:music',
        },
        name: 'music',
        path: '/music/index',
        component: () => import('@/views/pages/music/music.vue'),
      },
      {
        meta: {
          title: '图片',
          icon: 'mdi:image',
        },
        name: 'image',
        path: '/image/index',
        component: () => import('@/views/pages/image/image.vue'),
      },
    ],
  },
]
export default routes
