import { DefaultTheme } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  '/components/': [
    {
      text: '组件库',
      items: [
        { text: '音乐播放器', link: '/AudioWave/index' },
        { text: '按钮', link: '/button/index' },
      ],
    },
  ],
}
export default sidebar
