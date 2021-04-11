<template>
  <div>
    <section v-if="error" id="error__message">
			<h1>{{ error.message }}</h1>
			<p>{{ error.error }}</p>
    </section>

    <section v-else-if="!post.title" id="error__message">
      <h1>이미 삭제되었거나 존재하지않은 게시글입니다.</h1>
      <a href="http://localhost:8080/app.html#/pages/community">comunity로 돌아가기</a>
    </section>

    <section v-else>
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
        <router-link :to="`/post/update/${post.postid}`" class="update-button" >update</router-link>
      </div>
    </section>
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
      const result = await fetchDeletePost(this.post.postid);
      if(result){
        this.$router.go(-1)   // === window.history.go()
      }
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
    const postid = this.$route.params.postid;
    await this.$store.dispatch('FETCH_POST', postid);
    if(this.post.error){
			this.error = this.post;
		}
  }
}
</script>

<style scoped>
  #error__message{
    text-align: center;
  }
  #error__message h1{
    font-size: 2rem;
  }
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
  .ProseMirror > p > img{
    max-width: 100%;
  }
</style>