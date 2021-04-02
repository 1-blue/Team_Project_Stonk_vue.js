<template>
  <div>
    <section id="error-section" v-if="error">
      <p v-if="error === 'idOverlap'">
        이미 가입된 아이디가 존재합니다.
      </p>
      <p v-else-if="error === 'passwordError'">
        비밀번호가 불일치합니다.
      </p>
      <p v-else-if="error === 'nicknameOverlap'">
        이미 사용된 닉네임입니다.
      </p>
      <p>
        디자인이나 형식이나 나중에수정 기능구현부터
      </p>
    </section>
    <div id="register-center" class="shadow">
      <section id="title">
        <h1 id="h1-tag">STONK</h1>
        <h3>회원가입</h3>
      </section>
      <section id="">
        <!-- enctype="multipart/form-data"  -->
        <form action="api/register" method="post" id="register-form" class="shadow">

          <input type="text" placeholder="아이디입력" name="id" size=15 required />

          <div class="input-password">
            <input :type="checkPasswordShow" placeholder="비밀번호입력" name="pw" size=15 required />
            <i class="fas fa-eye password-icon" v-show="showPassword" @click="onShowPassword"></i>
            <i class="fas fa-eye-slash password-icon" v-show="!showPassword" @click="onShowPassword"></i>
          </div>

          <div class="input-password-check">
            <input :type="checkPasswordCheckShow" placeholder="비밀번호확인" name="passwordCheck" size=15 required />
            <i class="fas fa-eye password-icon" v-show="showPasswordCheck" @click="onShowPasswordCheck"></i>
            <i class="fas fa-eye-slash password-icon" v-show="!showPasswordCheck" @click="onShowPasswordCheck"></i>
          </div>

          <input type="text" placeholder="닉네임입력" name="nickname" size=15 required />

          <div id="birth">
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
          </div>

          <div id="gender">
            <label for="male">남성</label>
            <input type="radio" name="gender" value="male" id="male" required />
            <label for="female">여성</label>
            <input type="radio" name="gender" value="female" id="female" required />
          </div>

          <div id="phone-number">
            <label>폰번호</label>
            <input type="text" name="phoneNumber1" minlength="3" maxlength="3" value="010" class="first-phone-number" pattern="[0-9]{3,3}" required />
            <label>-</label>
            <input type="text" name="phoneNumber2" minlength="4" maxlength="4" class="second-phone-number" pattern="[0-9]{4,4}" placeholder="1234" required />
            <label>-</label>
            <input type="text" name="phoneNumber3" minlength="4" maxlength="4" class="third-phone-number" pattern="[0-9]{4,4}" placeholder="5678" required />
          </div>

          <input type="text" placeholder="간단한 자기소개" name="quote" size=15 />

          <!-- 프로필이미지 -->
          <!-- <div id="profile-image">
            <input type="file" name="profileimage" accept="image/*"/>
          </div> -->
          
          <div>
            <button type="submit" class="button">
              <h1 class="button-text">회원가입</h1>
            </button>
          </div>
        </form>
      </section>
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
  #register-center {
    margin: 50px;
    text-align: center;
    border: 2px solid black;
    background: white;
    border-radius: 20px;
    width: 400px;
    height: 100%;
    float: right;
  }
  #register-form{
    text-align: center;
    margin-top: 20px;
  }
  #h1-tag{
    font-size: 50px;
    margin: 10px;
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
  .button{
    margin: 40px 0px;
  }
  .input-password, .input-password-check{
    position: relative;
  }

  .password-icon{
		position: absolute;
    right: 60px;
    top: 25px;
		z-index: 3;
	}

  select{
    width: 70px;
    height: 25px;
    margin-left: 13px;
  }

  label{
    color: blue;
  }

  #gender input{
    width: 40px;
    height: 20px;
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

  #error-section{
    background: white;
    color: black;
    width: 30vw;
    height: 30vh;
    position: absolute;
    top: 35vh;
    left: 20vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    border-radius: 20px;
    border: 5px dotted red;
  }
</style>