import { fetchItems, fetchCommunity, fetchPost, fetchUser } from '../api/fetch.js';

export default{
  async FETCH_ITEMS(context){
    try{
      let data = await fetchItems();
      context.commit('SET_ITEMS', data);
      return Promise.resolve('success');
    }catch(err){
      console.error(err);
    }
  },
  async FETCH_COMMUNITY(context){
    try{
      let data = await fetchCommunity();
      context.commit('SET_COMMUNITY', data);
      return Promise.resolve('success');
    }catch(err){
      console.error(err);
    }
  },
  async FETCH_POST(context, title){
    try{
      let data = await fetchPost(title);
      context.commit('SET_POST', data);
      return Promise.resolve('success');
    }catch(err){
      console.error(err);
    }
  },
  async FETCH_USER(context, name){
    try{
      let data = await fetchUser(name);
      context.commit('SET_USER', data);
      return Promise.resolve('success');
    }catch(err){
      console.error(err);
    }
  },
  LOGIN_SUCCESS(context){
    context.commit("SET_LOGIN_SUCCESS");
  },
  LOGOUT(context){
    context.commit("SET_LOGOUT");
  }
}