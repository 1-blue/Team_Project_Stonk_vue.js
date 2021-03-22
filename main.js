import Vue from 'vue';
import app from "./app.vue";
import { store } from "./src/store/index.js";


new Vue({
  render: h => h(app),
  store,
}).$mount("#root");