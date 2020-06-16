import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

import http from './http.js'
Vue.prototype.$http = http;

Vue.mixin({
  computed: {
    uploadUrl() {
      console.log(123)
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeader() {
      console.log(145);
      
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


