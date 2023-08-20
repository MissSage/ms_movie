import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  renderWithQiankun,
  qiankunWindow,
  QiankunProps,
} from 'vite-plugin-qiankun/dist/helper'
// 手动引入ELMessage和ELMessageBox需要引入其样式文件
// 参考http://element-plus.org/zh-CN/guide/quickstart.html#%E6%89%8B%E5%8A%A8%E5%AF%BC%E5%85%A5
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import 'nprogress/nprogress.css'
import './assets/styles/style.scss'
import App from './App.vue'
import router from './router/index'
import { registerPiniaStore } from './store'

const initQianKun = () => {
  renderWithQiankun({
    // bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap
    // 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等
    bootstrap() {
      console.log('bootstrap')
    },
    // 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法，也可以接受主应用传来的参数
    mount(_props: any) {
      console.log('mount', _props)
      render(_props.container)
    },
    // 应用每次 切出/卸载 会调用的unmount方法，通常在这里我们会卸载微应用的应用实例
    unmount(_props: any) {
      console.log('unmount', _props)
    },
    update: function (props: QiankunProps): void | Promise<void> {
      console.log('update', props)
    },
  })
}

const render = (container: string | null) => {
  // 如果是在主应用的环境下就挂载主应用的节点，否则挂载到本地
  const appDom = container ?? '#app'
  const app = createApp(App).use(router).use(createPinia())
  registerPiniaStore()
  app.mount(appDom)
}
// 判断是否为乾坤环境，否则会报错[qiankun]: Target container with #subAppContainerVue3 not existed while subAppVue3 mounting!
qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render(null)
