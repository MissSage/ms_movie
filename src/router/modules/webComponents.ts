import { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    meta: {
      // isGroup: true,
      title: "WebComponents",
      icon: "mdi:spotlight-beam"
    },
    redirect: "/fc",
    path: "/webcomponents",
    children: [
      {
        meta: {
          title: "fc-components"
        },
        name: "fc",
        path: "/fc",
        component: () => import("@/views/pages/fc.vue")
      }
    ]
  }
]
export default routes
