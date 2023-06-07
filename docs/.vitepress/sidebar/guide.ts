import { DefaultTheme } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  '/guide/': [
    {
      text: '指南',
      items: [
        { text: '快速开始', link: '/guide/getting-started' },
        {
          text: 'gh-pages',
          link: '/guide/gh-pages',
        },
        {
          text: 'imagemin',
          link: '/guide/imagemin'
        }
      ],
    },
  ],
}
export default sidebar
