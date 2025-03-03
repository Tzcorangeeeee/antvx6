import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import clickOutsideDirective from '@/directive/clickOutside'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 注册ElementPlus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`el-icon-${key.toLowerCase()}`, component)
}

// 安装插件并挂载
app.use(ElementPlus)
  .use(router)
  .directive('click-outside', clickOutsideDirective)
  .mount('#app') // 确保这是最后一个调用
