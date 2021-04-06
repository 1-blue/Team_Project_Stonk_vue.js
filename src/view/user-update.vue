<template>
  <div>
    <!-- 유저 권한 확인 -->
    <section v-if="isMyInformationPage">
        <form action="api/user" method="post" id="register-form" class="user-form">
          <ul>
            <!-- 유저식별자 -->
            <li>
              <input type="hidden" name="userid" :value="user.userid" size=15 required />
            </li>

            <!-- 아이디 -->
            <li>
              <label for="user-id">아이디</label>
              <input type="text" placeholder="아이디입력" id="user-id" name="id" :value="user.id.trim()" size=15 required />
            </li>

            <!-- 닉네임 -->
            <li>
              <label for="user-nickname">닉네임</label>
              <input type="text" placeholder="닉네임입력" id="user-nickname" :value="user.nickname.trim()" name="nickname" size=15 required />
            </li>

            <!-- 생일 -->
            <li>
              <label id="user-birthday">생일</label>
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
            <li class="list-gender">
              <label for="male">남성</label>
              <input type="radio" name="gender" value="male" id="male"  required />
              <label for="female">여성</label>
              <input type="radio" name="gender" value="female" id="female" required />
            </li>

            <!-- 폰번호 -->
            <li>
              <label>폰번호</label>
              <input type="text" name="phoneNumber1" minlength="3" maxlength="3" :value="defaultPhoneNumber[0]" class="first-phone-number" pattern="[0-9]{3,3}" required />
              <span>-</span>
              <input type="text" name="phoneNumber2" minlength="4" maxlength="4" :value="defaultPhoneNumber[1]" class="second-phone-number" pattern="[0-9]{4,4}" placeholder="1234" required />
              <span>-</span>
              <input type="text" name="phoneNumber3" minlength="4" maxlength="4" :value="defaultPhoneNumber[2]" class="third-phone-number" pattern="[0-9]{4,4}" placeholder="5678" required />
            </li>

            <!-- 자기소개 -->
            <li>
              <label for="user-quote">자기소개</label>
              <input type="text" placeholder="간단한 자기소개" :value="defaultQuote" id="user-quote" name="quote" size=15 />
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
import { fetchUser } from '../api/fetch.js';

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

      // 자기소개
      this.defaultQuote = this.user.quote;

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
    height: 35px;
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

  .button{
    margin: 40px 0px;
  }

  .user-form {
    background: white;
    border-radius: 20px;
    width: 35%;
    padding: 0 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .list-gender{
    display: flex;
    justify-content: center;
  }

  .list-gender input{
    width: 40px;
    height: 20px;
    margin: 0;
  }

  .first-phone-number{
    text-align: center;
    width: 40px;
    margin: 0px 9px;
  }

  .second-phone-number, .third-phone-number{
    text-align: center;
    width: 60px;
    margin: 0px 9px;
  }
</style>