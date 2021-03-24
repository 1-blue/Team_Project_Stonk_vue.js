import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js';
import actions from './actions.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isLogin: false,			// 로그인상태일때
        items: [],
    },
    mutations,
    actions,
});