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
    SET_LOGIN(state){
        state.login = true;
    },
    
}