<template>
  <div id="register-center" class="shadow">
    <section id="title">
      <h1 id="h1-tag">STONK</h1>
      <h3>회원가입</h3>
    </section>
    <section id="">
      <form action="http://localhost:3000/auth" method="post" id="register-form" class="shadow">
        <input type="text" placeholder="아이디입력" name="id" size=15 />
        <div class="input-password">
          <input :type="checkPasswordShow" placeholder="비밀번호입력" name="password" size=15 />
          <i class="fas fa-eye password-icon" v-show="showPassword" @click="onShowPassword"></i>
          <i class="fas fa-eye-slash password-icon" v-show="!showPassword" @click="onShowPassword"></i>
        </div>
        <div class="input-password-check">
          <input :type="checkPasswordCheckShow" placeholder="비밀번호확인" name="passwordCheck" size=15 />
          <i class="fas fa-eye password-icon" v-show="showPasswordCheck" @click="onShowPasswordCheck"></i>
          <i class="fas fa-eye-slash password-icon" v-show="!showPasswordCheck" @click="onShowPasswordCheck"></i>
        </div>
        <input type="text" placeholder="간단한 자기소개" name="comment" size=15 />

        <div>
          <button type="submit" class="button">
            <h1 class="button-text">회원가입</h1>
          </button>
        </div>
      </form>
    </section>
  </div>

</template>

<script>
export default {
  data(){
    return{
      showPassword: false,
      showPasswordCheck: false,
    }
  },
  methods:{
    onShowPassword(){
      this.showPassword = !this.showPassword;
    },
    onShowPasswordCheck(){
      this.showPasswordCheck = !this.showPasswordCheck;
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
		},
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
</style>