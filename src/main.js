import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import Icon from 'vue-awesome/components/Icon'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-awesome/icons'
import * as api from './rest/api.js'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.component('icon', Icon);
Vue.use(ElementUI);
Vue.use(VueClipboard);

new Vue({
  render: h => h(App),
}).$mount('#app');
