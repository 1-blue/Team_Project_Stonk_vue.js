import Vue from 'vue';
import VueRouter from 'vue-router';

import pageRouter from './page-router.vue';
import postPage from '../view/post-page.vue';
import userPage from '../view/user-page.vue';
import postAppendPage from '../components/post-append-page.vue';

Vue.use(VueRouter);

const routes = [
    {path: '/pages/:name', component: pageRouter },
    {path: '/post/append', component: postAppendPage },
    {path: '/post/:title', component: postPage },
    {path: '/user/:name', component: userPage },
]

// vue-router인스턴스에 routes정의
export default new VueRouter({
    //mode: 'history',
    routes,
})