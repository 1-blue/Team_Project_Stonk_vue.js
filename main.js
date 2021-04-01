import Vue from 'vue';
import app from "./app.vue";
import { store } from "./src/store/index.js";
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);

new Vue({
  render: h => h(app),
  store,
}).$mount("#root");