import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "normalize.css"
import '@/assets/css/styles.css'
import '@/iconfont/iconfont.css'

import MyTable from '@/components/myTable'
import ResolveCsv from '@/components/resolveCsv'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.component('MyTable', MyTable)
Vue.component('ResolveCsv', ResolveCsv)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')