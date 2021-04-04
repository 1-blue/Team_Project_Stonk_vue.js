<template>
  <div>
    <template v-if="error">
			<h1>{{ error.message }}</h1>
			<p>{{ error.error }}</p>
    </template>

    <template v-else>
      <h1>{{ post.title }}</h1>
      <p v-html="post.contents" />
      <router-link :to="`/user/${post.user.nickname}`" class="user-nickname">
        <i class="fas fa-user"></i>
        {{ post.user.nickname }}
      </router-link>
      <p>
        <i class="far fa-clock"></i>
        {{ post.createddate }}
      </p>

      <div v-if="isMinePage">
        <button class="delete-button" @click="deletePost">delete</button>
        <button class="update-button">update</button>
      </div>

    </template>

  </div>
</template>

<script>
import { fetchDeletePost } from '../api/fetch.js';

export default {
  data(){
    return{
      error: "",
    }
  },
  methods: {
    async deletePost(){
      // 삭제는 완료
      await fetchDeletePost(this.post.title);
      // 완료텍스트띄워주고 커뮤니티페이지로 이동 구현필요
    }
  },
  computed: {
    post(){
      if(this.$store.state.post.error){
        return this.$store.state.post
      }
      return this.$store.state.post.data;
    },
    isMinePage(){
      return this.post.user.nickname === this.$cookies.get("login_nickName");
    }
  },
  async created(){
    const title = this.$route.params.title;
    await this.$store.dispatch('FETCH_POST', title);
    if(this.post.error){
			this.error = this.post;
		}
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
    color: black;
  }
  .user-nickname:hover{
		color: rgb(255, 252, 77);
		transition: all 1s;
	}
  .delete-button, .update-button{
    border: 0px;
    width: 10vw;
    height: 5vh;
    border-radius: 10px;
    float: right;
    margin: 10px;
    background: rgb(255, 255, 255);
    transition: all 1.5s;
    color: black;
  }
  .delete-button:hover, .update-button:hover{
    opacity: 0.5;
    color: cadetblue;
  }
</style>