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
      <section class="user-information-table">
        <h1>{{ user.nickname }}님의 정보</h1>
        <ul class="user-information">
          <li>닉네임 : {{ user.nickname }}</li>
          <li>생일 : {{ user.birth }}</li>
          <li>성별 : {{ getGender }}</li>
          <li>폰번호 : {{ user.phonenumber }}</li>
          <li>가입날짜 : {{ user.createdAt }}</li>
          <li>인사말 : {{ user.quote }}</li>
          <li>이미지 : 일단없음 </li>
        </ul>
        <section v-if="isMyInformationPage">
          <ul class="user-change-information">
            <li><router-link :to="passwordUpdateUrl">비밀번호수정</router-link></li>
            <li><router-link :to="updateUrl">회원정보수정</router-link></li>
            <li><button @click="signOut">회원탈퇴</button></li>
          </ul>
        </section>
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
    isMyInformationPage(){
			const nickname = this.$cookies.get("login_nickName");
      return this.user.nickname === nickname;
		},
    updateUrl(){
      return `/user/update/${this.user.nickname}`
    },
    passwordUpdateUrl(){
      return `/user/update/password/${this.user.nickname}`
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
  ul, li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  h1{
    font-size: 3rem;
    margin: 3vh 0;
    padding: 0;
  }
  li{
    display: inline-block;
  }
  a{
    text-decoration: none;
    color: lightyellow;
  }
  button{
    border: 0;
    background: lightsteelblue;
    color: lightyellow;
    font-size: 1rem;
    cursor: pointer;
  }
  #sign-out-message{
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 3vw;
  }
  .user-information-table{
    background: lightsteelblue;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 40%;
  }
  .user-information{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10%;
    margin-bottom: 2vh;
  }
  .user-information > li{
    padding-bottom: 1vh;
  }
  .user-change-information{
    display: flex;
    justify-content: center;
    margin: 2vh 0;
  }
  .user-change-information > li{
    margin: 0 1vw;
  }
  .user-change-information > li > a:hover, .user-change-information > li > button:hover{
    color: mediumblue;
  }

</style>