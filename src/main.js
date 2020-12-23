import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import axios from 'axios';
import globalData from './common/globalData.js';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios; 
Vue.prototype.$gd = globalData;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
