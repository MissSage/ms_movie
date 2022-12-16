/* eslint-disable prettier/prettier */

/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改
 */

import { createRouter, createWebHistory, RouterOptions } from "vue-router"

const routes = [
  {
    title: "首页",
    path: "/",
    component: () => import("./views/layout.vue"),
    redirect: "/home",
    children: [
      {
        title: "首页",
        name: "home",
        path: "/home",
        component: () => import("./views/home.vue")
      },
      {
        title: "视频",
        name: "videos",
        path: "/videos",
        component: () => import("./views/videos.vue")
      },
      {
        title: "创作",
        name: "add",
        path: "/add",
        component: () => import("./views/add.vue")
      }
    ]
  }
]

const routerConfig = {
  history: createWebHistory(),
  routes,
  scrollBehavior(to: any, from: any) {
    if (to.path !== from.path) {
      return { top: 0 }
    }
  }
}

const router = createRouter(routerConfig as RouterOptions)

export default router
