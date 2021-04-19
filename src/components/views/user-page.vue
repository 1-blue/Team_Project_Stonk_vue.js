<template>
  <div v-if="dataReady" class="user__page__container">
    <div v-if="error" class="error__page">
			<h1>{{ error.message }}</h1>
			<h3>{{ error.error }}</h3>
		</div>

    <div v-else-if="!isLogin" class="error__page">
      <h1>권한이 없습니다</h1>
      <h3>로그인후에 시도해주세요</h3>
		</div>

    <div v-else-if="!isSignOut && !error" class="user">
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
          <ul class="user__information__change__list">
            <li><router-link :to="passwordUpdateUrl">비밀번호수정</router-link></li>
            <li><router-link :to="updateUrl">회원정보수정</router-link></li>
            <li><button @click="signOut">회원탈퇴</button></li>
          </ul>
        </section>
      </section>
		</div>

    <section v-if="isSignOut" class="sign__out__message">
      <h1>회원탈퇴가 완료되었습니다.</h1>
      <a href="/app.html#/home">메인페이지로 돌아가기</a>
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
      dataReady: false
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
    },
    isLogin(){
      return this.$store.state.isLogin;
    }
  },
  async created(){
    const name = this.$route.params.name;
    await this.$store.dispatch("FETCH_USER", name);
    if(this.user.error){
			this.error = this.user;
		}

    this.dataReady = true;
  }
}
</script>

<style scoped>
.user__page__container{
  --button-color: lightyellow;
  --title-font-size: 2rem;
  --error-title-font-size: 3rem;
  --error-description-font-size: 1.5rem;
  --information-box-width: 400px;
  --information-box-height: 50vh;
  --information-container-padding-width: 10%;
  --information-container-padding-height: 2vh;
  --information-container-list-interval: 1vh;
  --button-font-size: 1rem;
}

/* 기본 css수정 */
ul, li{
  margin: 0;
  padding: 0;
  list-style: none;
}
h1{
  font-size: var(--title-font-size);
  margin: 3vh 0;
  padding: 0;
}
li{
  display: inline-block;
}
a{
  text-decoration: none;
  color: var(--button-color);
}
button{
  border: 0;
  background: none;
  color: var(--button-color);
  font-size: var(--button-font-size);
  cursor: pointer;
}

/* 에러관련 css */
@keyframes error__page{
  80%{
    transform: scale(1, 1);
  }
  to{
    transform: scale(0.8, 0.8);
  }
}
.error__page{
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: scale(0, 0);
    animation: error__page 2s forwards;
}
.error__page h1{
    font-size: var(--error-title-font-size);
}
.error__page h3{
    font-size: var(--error-description-font-size);
}

/* 유저 정보 관련 css */
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
  min-width: var(--information-box-width);
  height: var(--information-box-height);
  padding: var(--information-container-padding-height) var(--information-container-padding-width);
}
.user__information{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.user__information > li{
  padding-bottom: var(--information-container-list-interval);
}
.user__information__change__list{
  display: flex;
  justify-content: center;
  margin: 2vh 0;
}
.user__information__change__list > li{
  margin: 0 1vw;
}
.user__information__change__list > li > a:hover, .user__information__change__list > li > button:hover{
  color: mediumblue;
}

/* 회원탈퇴시 css */
@keyframes sign__out{
  70%{
    transform: scale(1, 1);
  }
  to{
    transform: scale(0.8, 0.8);
  }
}
.sign__out__message{
  display: flex;
  align-items: center;
  flex-direction: column;
  transform: scale(0, 0);
  animation: sign__out 2s forwards;
}
.sign__out__message h1{
  font-size: var(--error-title-font-size);
}
.sign__out__message a{
  font-size: var(--error-description-font-size);
}
</style>