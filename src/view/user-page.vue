<template>
  <div>
    <template v-if="error">
			<h1>{{ error.message }}</h1>
			<p>{{ error.error }}</p>
		</template>

    <template v-else>
      <p>유저이름 : {{userInfo.name}}</p>
      <p>업로드한 게시글 : {{userInfo.upload}}</p>
      <p>인사말 : {{userInfo.comment}}</p>
		</template>

  </div>
</template>

<script>
import { fetchUser } from '../api/fetch.js';

export default {
  data(){
    return{
      userInfo: {},
      error: "",
    }
  },
  methods(){

  },
  async created(){
    const username = this.$route.params.name;
    const userInfo = await fetchUser(username);
    if(userInfo.error){
			this.error = userInfo;
		} else {
			this.userInfo = userInfo.data;
		}
  }
}
</script>

<style scoped>
  p{
    color:white;
    font-size: 20px;
  }
</style>