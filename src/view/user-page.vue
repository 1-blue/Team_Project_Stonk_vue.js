<template>
  <div>
    <template v-if="error">
			<h1>{{ error.message }}</h1>
			<p>{{ error.error }}</p>
		</template>

    <section v-if="isSignOut" id="sign-out-message">
      <h1>회원탈퇴가 완료되었습니다.</h1>
      <a href="http://localhost:8080/app.html#/pages/main">메인페이지로 돌아가기</a>
    </section>

    <template v-else>
      <p>유저닉네임 : {{ user.nickname }}</p>
      <p>생일 : {{ user.birth }}</p>
      <p>성별 : {{ getGender }}</p>
      <p>인사말 : {{ user.phonenumber }}</p>
      <p>가입날짜 : {{ user.createdAt }}</p>
      <p>인사말 : {{ user.quote }}</p>
      <p>이미지 : 일단없음 </p>
      <p>개인정보 숨길거는 숨기면됨 글고 디자인은 모르겠음 나중에 수정하는걸로</p>
      <section v-if="isMyInfo">
        <button>수정</button>
        <button @click="signOut">회원탈퇴</button>
      </section>
		</template>
  </div>
</template>

<script>
import { fetchSignOut } from '../api/fetch.js';

export default {
  data(){
    return{
      error: "",
      isSignOut: false,
    }
  },
  methods: {
    async signOut(){
      const result = await fetchSignOut(this.user.nickname);
      if(result.status === 200){
        this.isSignOut = true;
      } else{
        error = result.error;
      }
    }
  },
  computed: {
    user(){
      if(this.$store.state.user.error){
        return this.$store.state.user
      }
      return this.$store.state.user.data;
    },
    getGender(){
      return this.user.gender === "T" ? "남성" : "여성";
    },
    isMyInfo(){
			const nickname = this.$cookies.get("login_nickName");
      return this.user.nickname === nickname;
		}
  },
  async created(){
    const name = this.$route.params.name;
    await this.$store.dispatch("FETCH_USER", name);
    if(this.user.error){
			this.error = this.user;
		}
  }
}
</script>

<style scoped>
  p{
    color:white;
    font-size: 20px;
  }
  #sign-out-message{
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 3vw;
  }
</style>