import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import VConsole from 'vconsole'
import AppComponent from './app.vue'
import router from './router/index'
import { setupStore } from '@/store'

import 'element-plus/dist/index.css'
import './styles/index.less'
import 'vue-tel-input/vue-tel-input.css'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

const app = createApp(AppComponent)

if (process.env.BASE_ENV === 'pre') {
  const vconsole = new VConsole()
  console.log('vconsole', vconsole)
}

app.use(router)
app.use(ElementPlus)
setupStore(app)
app.mount('#app')
