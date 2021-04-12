import Vue from 'vue';
import VueRouter from 'vue-router';

import homePage from '../components/views/home-page.vue';
import communityPage from '../components/views/community-page.vue';
import pricePage from '../components/views/price-page.vue';
import registerPage from '../components/views/register-page.vue';
import postPage from '../components/views/post-page.vue';
import userPage from '../components/views/user-page.vue';
import postAppendPage from '../components/views/post-append-page.vue';
import userUpdate from '../components/views/user-update.vue';
import userPasswordUpdate from '../components/views/user-password-update.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/pages/home' },
    { path: '/home', component: homePage },
    { path: '/community', component: communityPage },
    { path: '/price', component: pricePage },
    { path: '/register', component: registerPage },
    { path: '/community/:page', component: communityPage },
    { path: '/post/append', component: postAppendPage },
    { path: '/post/update/:postid', component: postAppendPage },
    { path: '/post/:postid', component: postPage },
    { path: '/user/update/password/:nickname', component: userPasswordUpdate },
    { path: '/user/update/:nickname', component: userUpdate },
    { path: '/user/:name', component: userPage },
]

// vue-router인스턴스에 routes정의
export default new VueRouter({
    //mode: 'history',
    routes,
})