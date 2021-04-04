export default {
    SET_ITEMS(state, data) {
        state.items = data;
    },
    SET_COMMUNITY(state, data) {
        state.communityData = data;
    },
    SET_POST(state, data) {
        state.post = data;
    },
    SET_USER(state, data) {
        state.user = data;
    },
    SET_LOGIN_SUCCESS(state){
        state.isLogin = true;
    },
    SET_LOGOUT(state){
        state.isLogin = true;
    },
    
}