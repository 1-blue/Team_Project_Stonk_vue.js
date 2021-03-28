<template>
  <div>
    <template v-if="error">
			<h1>{{ error.message }}</h1>
			<p>{{ error.error }}</p>
    </template>

    <template v-else>
      <h2>{{ postInfo.title }}</h2>
      <p>{{ postInfo.content }}</p>
      <router-link :to="`/user/${postInfo.user}`">
        <i class="fas fa-user"></i>
        {{ postInfo.user }}
      </router-link>
      <p>
        <i class="far fa-clock"></i>
        {{ postInfo.time_ago }}
      </p>
    </template>

  </div>
</template>

<script>
import { fetchPost } from "../api/fetch.js" 

export default {
  data(){
    return{
      postInfo: {},
      error: "",
    }
  },
  methods: {

  },
  async created(){
    const title = this.$route.params.title;
    this.postInfo = await fetchPost(title);
    if(this.postInfo.error){
			this.error = this.postInfo;
		} else {
			this.postInfo = this.postInfo.data;
		}
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
    color: black;
  }
</style>