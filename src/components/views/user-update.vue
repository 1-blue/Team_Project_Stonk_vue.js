<template>
  <div>
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
              <input type="hidden" name="userid" :value="user.userid.trim()" size=15 required />
            </li>

            <!-- 이전 닉네임 -->
            <li style="padding: 0;">
              <input type="hidden" name="previousNickname" :value="user.nickname.trim()" size=15 required />
            </li>

            <!-- 아이디 -->
            <li>
              <label for="user__id">아이디</label>
              <input type="text" placeholder="아이디입력" id="user__id" name="id" :value="user.id.trim()" size=15 required />
            </li>

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
  }
}
</script>

<style scoped>
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
  }

  input:focus{
    border-bottom: 2px solid rgb(74, 74, 226);
  }

  select{
    width: 70px;
    height: 25px;
    margin-left: 13px;
  }

  label{
    color: blue;
  }

  @keyframes errorMessage{
    80%{
      transform: scale(1.3, 1.3);
    }
    to{
      transform: scale(1, 1);
    }
  }

  .error__message{
    position: absolute;
    font-size: 2rem;
    top: 10%;
    right: 30%;
    transform: scale(0, 0);
    animation: errorMessage 2s forwards ease-in-out;
  }

  .button{
    margin: 40px 0px;
  }

  .user__information__form {
    background: white;
    border-radius: 1rem;
    width: 400px;
    padding: 0 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form__title{
    margin: 2vh 0 0 0;
    font-size: 2rem;
  }

  .user__gird__container{
    display: grid;
    grid-template-columns: 1fr;
    align-content: space-between;
    height: 50vh;
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
</style>