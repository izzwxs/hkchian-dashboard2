import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/index.scss'

Vue.config.productionTip = false
var EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
