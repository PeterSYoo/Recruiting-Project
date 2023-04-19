import Vue from 'vue';
import App from './App.vue';
import './index.css';
import VeeValidate from 'vee-validate';
import { ValidationProvider } from 'vee-validate';

Vue.use(VeeValidate);
Vue.config.productionTip = false;
Vue.component('ValidationProvider', ValidationProvider);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
