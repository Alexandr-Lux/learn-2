import Vue from 'vue'
import Root from './Root.vue'
import router from './router'
import store from './store'
import Icon from './components/icons/Icon.vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })

Vue.component('Icon', Icon)

new Vue({
  router,
  store,
  render: h => h(Root)
}).$mount('#app')
