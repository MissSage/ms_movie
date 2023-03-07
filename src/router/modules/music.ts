import { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    meta: {
      title: "音乐",
      icon: "mdi:music"
    },
    path: "/music",
    redirect: "/musicIndex",
    children: [
      {
        meta: {
          title: "播放",
          icon: "mdi:movie-roll",
        },
        name: "music",
        path: "/musicIndex",
        component: () => import("@/views/pages/music/music.vue")
      },
    ]
  }
]
export default routes
