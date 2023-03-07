/* eslint-disable prettier/prettier */

/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改
 */

import { createRouter, createWebHistory, RouteRecordRaw, RouterOptions } from "vue-router"
import doodle from "./modules/doodle"
import movies from "./modules/movie"
import webComponents from "./modules/webComponents"
import music from './modules/music'
import NotFound from '@/views/404.vue'
export const routes: RouteRecordRaw[] = [
  {
    meta: {
      title: "首页",
      childOnly: true,
      icon: "mdi:home"
    },
    path: "/",
    component: () => import("@/views/layout/layout.vue"),
    redirect: "/home",
    children: [
      {
        meta: {
          title: "首页",
          icon: "mdi:home"
        },
        name: "home",
        path: "/home",
        component: () => import("@/views/pages/home.vue")
      },

      ...movies,
      ...webComponents,
      ...doodle,
      ...music,
      { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
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
