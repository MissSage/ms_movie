/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改
 */

import { createRouter, createWebHistory, RouteRecordRaw, RouterOptions } from 'vue-router'
import NProgress from 'nprogress'
import doodle from './modules/doodle'
import webComponents from './modules/webComponents'
import media from './modules/media'
import webgl from './modules/webgl'
import NotFound from '@/views/404.vue'
import games from './modules/games'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
export const routes: RouteRecordRaw[] = [
  {
    meta: {
      title: '首页',
      childOnly: true,
      icon: 'mdi:home',
    },
    path: '/',
    component: () => import('@/views/layout/layout.vue'),
    children: [
      {
        meta: {
          title: '首页',
          icon: 'mdi:home',
        },
        name: 'home',
        path: '/',
        component: () => import('@/views/pages/home.vue'),
      },

      ...media,
      ...webComponents,
      ...doodle,
      ...webgl,
      ...games,
      { path: '/:pathMatch(.*)*', meta: { notMenu: true }, name: 'NotFound', component: NotFound },
    ],
  },
]

const routerConfig = {
  // 当通过qiankun加载的时候，base值取activeRule的值
  history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__? '/myweb':'/'),
  routes,
  scrollBehavior(to: any, from: any) {
    if (to.path !== from.path) {
      return { top: 0 }
    }
  },
}

const router = createRouter(routerConfig as RouterOptions)
router.beforeEach(() => {
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
})

router.afterEach(() => {
  NProgress.done()
})
export default router
