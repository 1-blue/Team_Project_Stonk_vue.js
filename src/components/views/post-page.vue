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
      <ul class="post__list">
        <!-- 타이틀 -->
        <li class="title">
          <h1>
            <i class="far fa-question-circle"></i>
            {{ post.title }}
          </h1>
        </li>

        <!-- 게시글 정보 -->
        <li class="information">
          <div class="serve__information">
            <div class="user">
              <router-link :to="`/user/${post.user.nickname}`" class="user__link">
                <i class="fas fa-user"></i>
                {{ post.user.nickname }}
              </router-link>
            </div>

            <!-- 시간 -->
            <div class="time">
              <i class="far fa-clock"></i>
              {{ post.updatedAt }}
            </div>
          </div>

          <!-- 버튼들 -->
          <div v-if="isMinePage" class="buttons">
            <button class="delete__button" @click="deletePost">삭제</button>
            <router-link :to="`/post/update/${post.postid}`" class="update__button" >수정</router-link>
          </div>
        </li>

        <hr />

        <!-- 내용물 -->
        <li>
          <div v-html="getContents" />
        </li>
      </ul>

      <hr />

      <!-- 댓글 -->
      <comment />

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

.post__page__container{
  display: flex;
  justify-content: center;
}

.post__container{
  min-width: 70%;
  min-height: 50vh;
  background: whitesmoke;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 20px black;
}

.title h1{
  font-size: 2rem;
  padding: 0;
  margin: 0.5em 0 1em 0;
}

.information{
  display: flex;
  justify-content: space-between;
}

.serve__information{
  display: flex;
  align-items: baseline;
}

.user{
  font-size: 1em;
  margin-right: 1em;
}

.user__link{
  transition: all 0.5s;
}

.user__link:hover{
  color: blue;
}

.time{
  font-size: 0.8em;
  color: gray;
}

hr{
  margin: 2em 0;
}

a{
  text-decoration: none;
  color: black;
}

.buttons{
  display: flex;
  justify-content: flex-end;
}

.delete__button, .update__button{
  background: none;
  border: 0px;
  padding: 0;
  margin-left: 1em;
  font-size: 1em;
  cursor: pointer;
  color: gray;
  border-bottom: 2px solid gray;
}

#error__message{
  text-align: center;
}

#error__message h1{
  font-size: 2rem;
}
</style>