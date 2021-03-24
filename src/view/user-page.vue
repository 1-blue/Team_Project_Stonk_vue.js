<template>
  <div>
    <p>유저이름 : {{userInfo.name}}</p>
    <p>업로드한 게시글 : {{userInfo.upload}}</p>
    <p>인사말 : {{userInfo.comment}}</p>
  </div>
</template>

<script>
import { fetchUser } from '../api/fetch.js';

export default {
  data(){
    return{
      userInfo: {},
    }
  },
  methods(){

  },
  async created(){
    const username = this.$route.params.name;
    const userInfo = await fetchUser(username);
    this.userInfo = userInfo.data;
  }
}
</script>

<style scoped>

</style>