import Vue from 'vue';
import VueRouter from 'vue-router';

import pageRouter from './page-router.vue';
import postPage from '../view/post-page.vue';
import userPage from '../view/user-page.vue';
import postAppendPage from '../components/post-append-page.vue';
import userUpdate from '../view/user-update.vue';
import userPasswordUpdate from '../view/user-password-update.vue';

//추가
import communityPage from '../view/community-page.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/pages/main' },
    { path: '/community', component: communityPage },
    { path: '/community/:page', component: communityPage },
    { path: '/pages/:name', component: pageRouter },
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