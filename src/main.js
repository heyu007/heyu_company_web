import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import axios from 'axios';
import globalData from './common/globalData.js';
import {setCookie, getCookie, delCookie} from './common/cookie.js';


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios; 
Vue.prototype.$gd = globalData;
Vue.prototype.$cookieStore = {
  setCookie,
  getCookie,
  delCookie
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
