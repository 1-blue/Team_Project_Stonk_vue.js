import { fetchItems } from '../api/fetch.js';

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
  LOGIN(context){
    context.commit("SET_LOGIN");
  }
}