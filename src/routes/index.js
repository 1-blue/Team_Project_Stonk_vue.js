import Vue from 'vue';
import VueRouter from 'vue-router';

import homePage from '../view/home-page.vue';
import communityPage from '../view/community-page.vue';
import pricePage from '../view/price-page.vue';
import registerPage from '../view/register-page.vue';
import postPage from '../view/home-page.vue';
import userPage from '../view/user-page.vue';
import postAppendPage from '../components/post-append-page.vue';
import userUpdate from '../view/user-update.vue';
import userPasswordUpdate from '../view/user-password-update.vue';

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
    { path: '/post/:title', component: postPage },
    { path: '/user/update/password/:nickname', component: userPasswordUpdate },
    { path: '/user/update/:nickname', component: userUpdate },
    { path: '/user/:name', component: userPage },
]

// vue-router인스턴스에 routes정의
export default new VueRouter({
    //mode: 'history',
    routes,
})