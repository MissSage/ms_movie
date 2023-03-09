import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 手动引入ELMessage和ELMessageBox需要引入其样式文件
// 参考http://element-plus.org/zh-CN/guide/quickstart.html#%E6%89%8B%E5%8A%A8%E5%AF%BC%E5%85%A5
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import './assets/styles/style.scss'
import App from './App.vue'
import router from './router/index'
import { registerPiniaStore } from './store'
const app = createApp(App).use(router).use(createPinia())
registerPiniaStore()
app.mount('#app')
