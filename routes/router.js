import Vue from 'vue';
import VueRouter from 'vue-router';

import pageRouter from './page-router.vue';

Vue.use(VueRouter);

const routes = [
    {path: '/pages/:name', component: pageRouter },
]

// vue-router인스턴스에 routes정의
export default new VueRouter({
    //mode: 'history',
    routes,
})