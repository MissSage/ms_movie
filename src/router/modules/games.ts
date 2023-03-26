import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    meta: {
      title: '游戏',
      icon: 'mdi:gamepad',
    },
    path: '/game',
    redirect: '/tetris/index',
    children: [
      {
        meta: {
          title: '俄罗斯方块',
          icon: 'icon-park-outline:block-four',
        },
        name: 'tetris',
        path: '/tetris/index',
        component: () => import('@/views/pages/games/Tetris.vue'),
      },
    ],
  },
]
export default routes
