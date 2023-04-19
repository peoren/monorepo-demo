// core
import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import '@/permission'
// load
import { loadSvg } from '@/icons'
import { loadDirectives } from '@/directives'
// css
import 'normalize.css'
import '@/styles/index.scss'

const app = createApp(App)

/** 加载全局 SVG */
loadSvg(app)
/** 加载自定义指令 */
loadDirectives(app)

app.use(store).use(router).mount('#app')
