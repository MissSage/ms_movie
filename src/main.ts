import { createApp } from "vue"
import { createPinia } from "pinia"
import "./style.css"
import App from "./App.vue"
import router from "./router/index"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import { registerPiniaStore } from "./store"
const app = createApp(App).use(router).use(createPinia()).use(ElementPlus)
registerPiniaStore()
app.mount("#app")
