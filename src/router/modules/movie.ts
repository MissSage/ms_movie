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
          icon: "mdi:movie-roll"
        },
        name: "movieIndex",
        path: "/movieIndex",
        component: () => import("@/views/pages/movies/index.vue")
      },
      {
        meta: {
          title: "创作",
          notMenu: true,
          icon: "mdi:plus-circle-outline"
        },
        name: "addMovie",
        path: "/addMovie",
        component: () => import("@/views/pages/movies/add.vue")
      }
    ]
  }
]
export default routes
