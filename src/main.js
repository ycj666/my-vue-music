import Vue from 'vue'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'

import App from './App'
import store from './store'
import router from './router'

Vue.use(VueResource)
Vue.use(VueLazyload, {
    error: require('./assets/loading.svg'),
    loading: require('./assets/loading.svg'),
    attempt: 1
  }
)


//全局设置header的content-type,vue-resource的post请求的data默认不是以form data的形式，而是request payload
// Vue.http.options.emulateJSON = true;  
  

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),

})
