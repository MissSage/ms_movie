import { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    meta: {
      title: "视频",
      icon: "mdi:movie-roll"
    },
    path: "/movie",
    redirect: "/movieIndex",
    children: [
      {
        meta: {
          title: "视频",
          icon: "mdi:movie-roll",
          childOnly: true
        },
        name: "movieIndex",
        path: "/movieIndex",
        component: () => import("@/views/pages/movies/movies.vue"),
        children: [
          {
            meta: {
              title: '视频列表',
              icon: 'mdi:movie-roll'
            },
            name: 'movieDetail',
            path: '/play/:id',
            component: () => import('@/views/pages/movies/components/detail.vue')
          },
          {
            meta: {
              title: "创作",
              notMenu: true,
              icon: "mdi:plus-circle-outline"
            },
            name: "addMovie",
            path: "/add",
            component: () => import("@/views/pages/movies/components/add.vue")
          }
        ]
      },
    ]
  }
]
export default routes
