<template>
  <div class="post__page__container">
    <section v-if="error" id="error__message">
			<h1>{{ error.message }}</h1>
			<p>{{ error.error }}</p>
    </section>

    <section v-else-if="!post" id="error__message">
      <h1>이미 삭제되었거나 존재하지않은 게시글입니다.</h1>
      <a href="/app.html#/pages/community">comunity로 돌아가기</a>
    </section>

    <section v-else class="post__container">
      <!--  -->
      <i class="fas fa-sign-out-alt exit__icon" @click="exit"></i>
      <!-- 타이틀 -->
      <div class="title">
        <h1>
          {{ post.title }}
        </h1>
      </div>
      <!-- <i class="fas fa-edit"></i> -->

      <!-- 게시글 정보 -->
      <div class="information">
        <router-link :to="`/user/${post.user.nickname}`" class="user">
          <i class="fas fa-user"></i>
          {{ post.user.nickname }}
        </router-link>

        <!-- 시간 -->
        <div class="time">
          <i class="far fa-clock"></i>
          {{ post.updatedAt }}
        </div>

        <!-- 버튼들 -->
        <div v-if="isMinePage" class="buttons">
          <button class="delete__button" @click="deletePost">삭제</button>
          <router-link :to="`/post/update/${post.postid}`" class="update__button" >수정</router-link>
        </div>
      </div>
      
      <div class="contents">
        <div class="content" v-html="getContents" />

        <hr />

        <!-- 댓글 -->
        <comment />
      </div>
    </section>
  </div>
</template>

<script>
import { fetchDeletePost } from '../../api/fetch.js';
import comment from './comment.vue';

export default {
  components: {
    comment,
  },
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
    },
    exit(){
      this.$router.go(-1);
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
    },
    getContents(){
      const contents = this.post.contents;
      // class="ProseMirror" contenteditable="true" tabindex="0" 붙으면 입력가능하게되길래 일단 일차원적으로 없앰
      const temp = contents.replace(`class="ProseMirror" contenteditable="true" tabindex="0"`, "");
      return temp;
    }
  },
  async created(){
    const postid = this.$route.params.postid;
    await this.$store.dispatch('FETCH_POST', postid);
    if(this.post.error){
			this.error = this.post;
		}
  },
}
</script>

<style scoped>
ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}

a{
  text-decoration: none;
}

hr{
  margin: 2rem 0;
}

.post__page__container{
  display: flex;
  justify-content: center;
}

.post__container{
  position: relative;
  width: 100%;
}

.exit__icon{
  position: absolute;
  top: 34px;
  left: 30px;
  font-size: 3rem;
  color: #ffffff;
  cursor: pointer;
}

.title{
  width: 70%;
  margin-right: auto;
  margin-left: auto;
  border-image: url(../../assets/post/scrollborder.png) 24 fill repeat;
  border-image-width: 24px;
  border-image-outset: 6px;
  box-shadow: 0px 10px 5px #248;
  text-shadow: 0px 2px 1px #d5864f;
}

.title h1{
  font-size: 2rem;
  padding: 0.5rem 2rem;
  text-align: center;
}

.information{
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 2em;
  color: white;
  font-size: 1em;
}

.user{
  color: inherit;
  transition: all 0.5s;
  margin-right: 0.5em;
}

.user:hover{
  text-decoration: underline;
}

.time{
  font-size: inherit;
  margin-right: 0.5em;
}

.buttons{
  font-size: inherit;
  color: inherit;
}

.delete__button, .update__button{
  background: none;
  color: inherit;
  font-size: inherit;
  border: 0px;
  padding: 0;
  cursor: pointer;
}

.delete__button:hover, .update__button:hover{
  text-decoration: underline;
}

.contents{
  min-width: 90%;
  background: #fff6b4;
  padding: 1rem;
  box-shadow: 0px 8px 12px #248;
  border-width: 2px;
  border-style: solid;
  border-radius: 0.3rem;
  border: 2mm ridge rgb(250, 147, 5);
}

.content{
  min-height: 30vh;
  border: 1px solid #248;
  padding: 0 2rem;
  border-radius: 0.3em;
}

#error__message{
  text-align: center;
}

#error__message h1{
  font-size: 2rem;
}

@media screen and (max-width: 768px){
	.exit__icon{
    top: 40px;
    left: 25px;
		font-size: 2rem;
	}
}
</style>