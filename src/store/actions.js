import { fetchItems } from '../api/fetch.js';

export default{
  async FETCH_ITEMS(){
    try{
      let { data } = await fetchItems();
      this.commit('SET_ITEMS', data);
    }catch(err){
      console.error(err);
    }
  }
}