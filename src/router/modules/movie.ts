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
        },
        name: "movieIndex",
        path: "/movieIndex",
        component: () => import("@/views/pages/movies/movies.vue")
      },
    ]
  }
]
export default routes
