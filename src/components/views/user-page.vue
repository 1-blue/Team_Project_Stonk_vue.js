<template>
  <div>
    <template v-if="error">
			<h1>{{ error.message }}</h1>
			<p>{{ error.error }}</p>
		</template>

    <div v-else class="user">
      <section class="user__information__container">
        <h1>{{ user.nickname }}님의 정보</h1>
        <ul class="user__information">
          <li>닉네임 : {{ user.nickname }}</li>
          <li>생일 : {{ user.birth }}</li>
          <li>성별 : {{ getGender }}</li>
          <li>폰번호 : {{ user.phonenumber }}</li>
          <li>가입날짜 : {{ user.createdAt }}</li>
          <li>인사말 : {{ user.quote }}</li>
        </ul>
        <section v-if="isMyInformationPage">
          <ul class="user__change__information">
            <li><router-link :to="passwordUpdateUrl">비밀번호수정</router-link></li>
            <li><router-link :to="updateUrl">회원정보수정</router-link></li>
            <li><button @click="signOut">회원탈퇴</button></li>
          </ul>
        </section>
      </section>
		</div>

    <section v-if="isSignOut" id="sign__out__message">
      <h1>회원탈퇴가 완료되었습니다.</h1>
      <a href="http://localhost:8080/app.html#/main">메인페이지로 돌아가기</a>
    </section>
  </div>
</template>

<script>
import { fetchSignOut } from '../../api/fetch.js';

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
      return this.user.nickname.trim() === nickname.trim();
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
    font-size: 2rem;
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
    background: none;
    color: lightyellow;
    font-size: 1rem;
    cursor: pointer;
  }
  .user{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user__information__container{
    background: linear-gradient(to bottom, #034082, #148dfc ,#6beee3);
    border-radius: 1rem;
    box-shadow: 0px 0px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    min-width: 400px;
    height: 50vh;
  }
  .user__information{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10%;
    margin-bottom: 2vh;
  }
  .user__information > li{
    padding-bottom: 1vh;
  }
  .user__change__information{
    display: flex;
    justify-content: center;
    margin: 2vh 0;
  }
  .user__change__information > li{
    margin: 0 1vw;
  }
  .user__change__information > li > a:hover, .user__change__information > li > button:hover{
    color: mediumblue;
  }
  #sign__out__message{
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 3vw;
  }
</style>