<template>
  <div v-if="dataReady" class="user__update__container">
    <h1 v-if="error === 'nicknameOverlap'" class="error__message">
      이미 가입된 닉네임이 존재합니다.
    </h1>

    <!-- 유저 권한 확인 -->
    <section v-if="isMyInformationPage">
        <form :action="`api/user`" method="post" class="user__information__form">
          <h1 class="form__title">회원정보변경</h1>

          <ul class="user__gird__container">
            <!-- 유저식별자 -->
            <li style="padding: 0;">
              <input type="hidden" name="userid" :value="user.userid" size=15 required />
            </li>

            <!-- 이전 닉네임 -->
            <li style="padding: 0;">
              <input type="hidden" name="previousNickname" :value="user.nickname.trim()" size=15 required />
            </li>

            <!-- 아이디 -->
            <!-- <li> -->
              <!-- <label for="user__id">아이디</label> -->
              <!-- <input type="text" placeholder="아이디입력" id="user__id" name="id" :value="user.id.trim()" size=15 required /> -->
            <!-- </li> -->

            <!-- 닉네임 -->
            <li>
              <label for="user__nickname">닉네임</label>
              <input type="text" placeholder="닉네임입력" id="user__nickname" :value="user.nickname.trim()" name="nickname" size=15 required />
            </li>

            <!-- 생일 -->
            <li>
              <label id="user__birthday">생일</label>
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
            <li class="user__gender">
              <div>
                <label for="male">남성</label>
                <input type="radio" name="gender" value="male" id="male"  required />
              </div>
              <div>
                <label for="female">여성</label>
                <input type="radio" name="gender" value="female" id="female" required />
              </div>
            </li>

            <!-- 폰번호 -->
            <li>
              <label>폰번호</label>
              <input type="text" name="phoneNumber1" minlength="3" maxlength="3" :value="defaultPhoneNumber[0]" class="first__phonenumber" pattern="[0-9]{3,3}" required />
              <span>-</span>
              <input type="text" name="phoneNumber2" minlength="4" maxlength="4" :value="defaultPhoneNumber[1]" class="second__phonenumber" pattern="[0-9]{4,4}" placeholder="1234" required />
              <span>-</span>
              <input type="text" name="phoneNumber3" minlength="4" maxlength="4" :value="defaultPhoneNumber[2]" class="third__phonenumber" pattern="[0-9]{4,4}" placeholder="5678" required />
            </li>

            <!-- 자기소개 -->
            <li>
              <label for="user__quote">자기소개</label>
              <input type="text" placeholder="간단한 자기소개" :value="defaultQuote" id="user__quote" name="quote" size=15 />
            </li>
          </ul>
          <button type="submit" class="button">
            <h1 class="button-text">수정완료</h1>
          </button> 
        </form>
    </section>

    <section v-else>
      <h1>권한이 없습니다. 확인후에 다시 접속해주세요</h1>
    </section>
  </div>
</template>

<script>
import { fetchUser } from '../../api/fetch.js';

export default {
  data(){
    return{
      user: {},
      year: [],
      month: [],
      day: [],
      defaultBirth: [],
      defaultGender: true,
      defaultPhoneNumber: [],
      defaultQuote: "",
      dataReady: false,
    }
  },
  methods: {
    getDefaultYear(year){
      return year === Number(this.defaultBirth[0]) ? "selected" : "";
    },
    getDefaultMonth(month){
      return month === Number(this.defaultBirth[1]) ? "selected" : "";
    },
    getDefaultDay(day){
      return day === Number(this.defaultBirth[2]) ? "selected" : "";
    },
    isMyInformationPage(){
			const nickname = this.$cookies.get("login_nickName").trim();
      return nickname === this.$route.params.nickname;
		},
  },
  computed: {
    error(){
      return this.$route.query.error;
    }
  },
  async created(){
    if(this.isMyInformationPage){
      this.user = await fetchUser(this.$route.params.nickname);
      this.user = this.user.data;

      // 생일
      this.defaultBirth = this.user.birth.split("-");

      // 성별
      const gender = this.user.gender;
      this.defaultGender = gender === "T" ? true : false;
      
      // 폰번호
      this.defaultPhoneNumber = this.user.phonenumber.split("-");
      this.defaultPhoneNumber.forEach((v, i) => {
        this.defaultPhoneNumber[i] = v.trim();
      })

      // 자기소개
      this.defaultQuote = this.user.quote.trim();

      this.year = Array(122).fill().map((v, i) => i + 1900);
      this.month = Array(12).fill().map((v, i) => i + 1);
      this.day = Array(31).fill().map((v, i) => i + 1);
    }

    this.dataReady = true;
  }
}
</script>

<style scoped>
.user__update__container{
  --error-font-size: 2rem;
  --form-background-color: #fff6b4;
  --form-width: 400px;
  --form-height: 100%;
  --form-padding: 2em;
  --form-title-interval: 2vh;
  --form-title-font-size: 2rem;
}

/* 기본 css수정 */
ul{
  padding: 0;
  margin: 0;
}
li{
  margin: 0;
  padding: 1vh 0;
  list-style: none;
}
input{
  display: inline-block;
  width: 75%;
  height: 100%;
  margin: 10px 0px;
  outline: none;
  border: 0px;
  border-bottom: 2px solid black;
  background: transparent;
}
input:focus{
  border-bottom: 2px solid #F2A235;
}
select{
  width: 70px;
  height: 25px;
  margin-left: 13px;
}
label{
  color: #af4207;
}

/* 에러메시지 */
@keyframes errorMessage{
  80%{
    transform: scale(1, 1);
  }
  to{
    transform: scale(0.8, 0.8);
  }
}
.error__message{
  position: absolute;
  top: 10%;
  right: 30%;
  font-size: var(--error-font-size);
  transform: scale(0, 0);
  animation: errorMessage 2s forwards ease-in-out;
}

/* 내용 */
.button{
  margin: 40px 0px;
}
.user__information__form {
  background: var(--form-background-color);
  border: 2mm ridge #af4207;
  border-radius: 1rem;
  width: var(--form-width);
  height: var(--form-height);
  padding: 0 var(--form-padding);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form__title{
  margin-top: var(--form-title-interval);
  font-size: var(--form-title-font-size);
}
.user__gird__container{
  display: grid;
  grid-template-columns: 1fr;
  align-content: space-between;
  height: 40vh;
}
.user__gender{
  display: flex;
  justify-content: space-evenly;
}
.user__gender input{
  width: 2em;
  height: 1.5em;
  margin: 0;
}
.first__phonenumber{
  text-align: center;
  width: 2rem;
  margin: 0 1rem;
}
.second__phonenumber, .third__phonenumber{
  text-align: center;
  width: 3rem;
  margin: 0 1rem;
}

.button{
  border: 2px solid #E05409;
}
.button::after{
  background: #E05409;
}
.button-text{
  font-weight: bold;
  color: #613721;
}
.button:hover .button-text{
  color: white;
}
</style>