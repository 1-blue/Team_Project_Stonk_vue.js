<template>
  <div class="register__page__container">
    <section id="error__section" v-if="error">
      <p v-if="error === 'idOverlap'">
        이미 가입된 아이디가 존재합니다.
      </p>
      <p v-else-if="error === 'passwordError'">
        비밀번호가 불일치합니다.
      </p>
      <p v-else-if="error === 'nicknameOverlap'">
        이미 사용된 닉네임입니다.
      </p>
    </section>

    <div id="register__container">

      <h1>STONK</h1>

      <h3>회원가입</h3>

      <form action="api/auth/register" method="post" id="register-form">
      <ul class="register__list">
        <!-- 아이디 -->
        <li>
          <input type="text" placeholder="아이디입력" name="id" size=15 required />
        </li>

        <!-- 비밀번호 -->
        <li class="input__password">
          <input :type="checkPasswordShow" placeholder="비밀번호입력" name="pw" size=15 required />
          <i class="fas fa-eye password__icon" v-show="showPassword" @click="onShowPassword"></i>
          <i class="fas fa-eye-slash password__icon" v-show="!showPassword" @click="onShowPassword"></i>
        </li>

        <!-- 비밀번호체크 -->
        <li class="input__password__check">
          <input :type="checkPasswordCheckShow" placeholder="비밀번호확인" name="passwordCheck" size=15 required />
          <i class="fas fa-eye password__icon" v-show="showPasswordCheck" @click="onShowPasswordCheck"></i>
          <i class="fas fa-eye-slash password__icon" v-show="!showPasswordCheck" @click="onShowPasswordCheck"></i>
        </li>

        <!-- 닉네임 -->
        <li>
          <input type="text" placeholder="닉네임입력" name="nickname" size=15 required />
        </li>

        <!-- 생일 -->
        <li class="birth">
          <label>생일</label>
          <select name="year">
            <option v-for="value in year" :key="value" :selected="getDefaultYear(value)">{{value}}</option>
          </select>
          <select name="month">
            <option v-for="value in month" :key="value" :selected="getDefaultMonth(value)">{{value}}</option>
          </select>
          <select name="day">
            <option v-for="value in day" :key="value" :selected="getDefaultDay(value)">{{value}}</option>
          </select>
        </li>

        <!-- 성별 -->
        <li class="gender">
          <div>
            <label for="male">남성</label>
            <input type="radio" name="gender" value="male" id="male" required />
          </div>
          <div>
            <label for="female">여성</label>
            <input type="radio" name="gender" value="female" id="female" required />
          </div>
        </li>

        <!-- 폰번호 -->
        <li class="phone__number">
          <label>폰번호</label>
          <input type="text" name="phoneNumber1" minlength="3" maxlength="3" value="010" class="first__phone__number" pattern="[0-9]{3,3}" required />
          <label>-</label>
          <input type="text" name="phoneNumber2" minlength="4" maxlength="4" class="second__phone__number" pattern="[0-9]{4,4}" placeholder="1234" required />
          <label>-</label>
          <input type="text" name="phoneNumber3" minlength="4" maxlength="4" class="third__phone__number" pattern="[0-9]{4,4}" placeholder="5678" required />
        </li>

        <!-- 자기소개 -->
        <li class="item">
          <input type="text" placeholder="간단한 자기소개" name="quote" size=15 />
        </li>
      </ul>

      <!-- 전송버튼 -->
      <div>
        <button type="submit" class="button">
          <span class="button-text">회원가입</span>
        </button>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      showPassword: false,
      showPasswordCheck: false,
      year: [],
      month: [],
      day: [],
      defaultYear: 1998,
      defaultMonth: 11,
      defaultDay: 6,
      error: "",
    }
  },
  methods:{
    onShowPassword(){
      this.showPassword = !this.showPassword;
    },
    onShowPasswordCheck(){
      this.showPasswordCheck = !this.showPasswordCheck;
    },
    getDefaultYear(year){
      return year === this.defaultYear ? "selected" : "";
    },
    getDefaultMonth(month){
      return month === this.defaultMonth ? "selected" : "";
    },
    getDefaultDay(day){
      return day === this.defaultDay ? "selected" : "";
    },
  },
  computed: {
    checkPasswordShow(){
			if(this.showPassword){
				return "text";
			}
			else{
				return "password";
			}
		},
    checkPasswordCheckShow(){
			if(this.showPasswordCheck){
				return "text";
			}
			else{
				return "password";
			}
		}
  },
  created(){
    this.year = Array(122).fill().map((v, i) => i + 1900);
    this.month = Array(12).fill().map((v, i) => i + 1);
    this.day = Array(31).fill().map((v, i) => i + 1);
  },
  mounted(){
    this.error = this.$route.query.error;
  }
}
</script>

<style scoped>
.register__page__container{
  --form-background-color: white;
  --form-width: 450px;
  --form-height: 100%;
  --form-padding-top: 1em;
  --form-padding-bottom: 2em;
  --form-title-interval: 2vh;
  --form-title-font-size: 2.5rem;
  --form-serve-title-font-size: 1.5rem;
  --error-font-size: 2rem;
  --error-font-color: red;
}

/* 기본 css */
ul, li{
  margin: 0;
  padding: 0;
  list-style: none;
}
input{
  display: inline-block;
  width: 60%;
  height: 5vh;
  outline: none;
  border: 0px;
  border-bottom: 2px solid black;
  padding: 0;
}
input:focus{
  border-bottom: 2px solid rgb(74, 74, 226);
}

/*  */
#register__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  background: var(--form-background-color);
  border-radius: 1rem;
  max-width: var(--form-width);
  height: var(--form-height);
  padding: var(--form-padding-top) 0 var(--form-padding-bottom) 0;
}
#register__container h1{
  margin: 0px;
  font-size: var(--form-title-font-size);
}
#register__container h3{
  margin: 0px;
  font-size: var(--form-serve-title-font-size);
}
#register-form{
  text-align: center;
  margin-top: 20px;
  width: 100%;
}
.register__list li{
  margin-bottom: 1em;
}
.input__password, .input__password__check{
  position: relative;
}
.password__icon{
	position: absolute;
  right: 6em;
  top: 0.5em;
	z-index: 3;
}
label{
  color: blue;
}
select{
  width: 15%;
  height: 2em;
  margin-left: 0.5em;
}
.gender{
  display: flex;
  justify-content: space-evenly;
}
.gender div{
  display: flex;
  align-items: center;
}
.gender input{
  width: 1.5em;
}
.first__phone__number{
  text-align: center;
  width: 3em;
  margin: 0px 0.5em;
}
.second__phone__number, .third__phone__number{
  text-align: center;
  width: 4em;
  margin: 0px 0.5em;
}
.button-text{
  font-size: 2em;
  font-weight: bold;
}
@keyframes errorMessage{
  80%{
    transform: scale(1.3, 1.3);
  }
  to{
    transform: scale(1, 1);
  }
}
#error__section{
  color: var(--error-font-color);
  position: absolute;
  top: 10%;
  right: 30%;
  font-size: var(--error-font-size);
  transform: scale(0, 0);
  animation: errorMessage 2s forwards ease-in-out;
}
</style>