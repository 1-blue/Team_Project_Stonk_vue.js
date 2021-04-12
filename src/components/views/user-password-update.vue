<template>
  <div>
    <!-- 기존패스워드와 불일치 에러 -->
    <h1 v-if="error === 'passwordDiscord'" class="error__section">
      기존 패스워드와 <br /> 입력하신 패스워드가 다릅니다.
    </h1>

    <!-- 변경패스워드 두개가 불일치함 -->
    <h1 v-if="error === 'notEqual'" class="error__section">
      변경하려고 입력하신 <br /> 패스워드두개가 서로 다릅니다.
    </h1>

    <section v-if="isAuthoriztion()">
      <form :action="`api/user/password/update/${nickname}`" method="post" class="password__form">
        <h1 class="form__title">비밀번호변경</h1>
        <ul>
          <li class="input__password">
            <label for="password">변경할 비밀번호</label>
            <input type="password" name="password" />
          </li>
          <li class="input__password">
            <label for="passwordCheck">확인용 비밀번호</label>
            <input type="password" name="passwordCheck" id="passwordCheck" />
          </li>
        </ul>
        <button type="submit" class="password__submit">전송</button>
      </form>
    </section>

    <section v-else>
      <form :action="`api/user/password/${nickname}`" method="post" class="password__form">
        <h1 class="form__title">비밀번호변경</h1>
        <div class="input__password">
          <label for="password">기존패스워드</label>
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit" class="password__submit">전송</button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    isAuthoriztion(){
      if(this.$cookies.isKey("password_update")){
        const cookie = this.$cookies.get("password_update").trim();
        return cookie === "stonk";
      } else {
        return false;
      }
    }
  },
  computed: {
    nickname(){
      return this.$cookies.get("login_nickName").trim();
    },
    error(){
      return this.$route.query.error;
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
    padding: 0;
    list-style: none;
  }

  input{
    display: inline-block;
    width: 60%;
    height: 35px;
    margin: 2em 0 2em 1em;
    outline: none;
    border: 0px;
    border-bottom: 2px solid black;
  }

  input:focus{
    border-bottom: 2px solid rgb(74, 74, 226);
  }

  label{
    color: blue;
    white-space: nowrap;
  }
  
  .password__form{
    background: white;
    border-radius: 1rem;
    max-width: 400px;
    height: 100%;
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form__title{
    padding: 0;
    margin: 0;
  }

  .input__password{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .password__submit{
    border-radius: 1rem;
    width: 40%;
    height: 50px;
    margin: 1em 0;
    border: 0;
    background: lightskyblue;
  }

  .password__submit:hover{
    background: blue;
    color: white;
    cursor: pointer;
  }

  @keyframes errorMessage{
    80%{
      transform: scale(1.3, 1.3);
    }
    to{
      transform: scale(1, 1);
    }
  }

  .error__section{
    color: red;
    position: absolute;
    top: 10%;
    right: 30%;
    font-size: 2rem;
    transform: scale(0, 0);
    animation: errorMessage 2s forwards ease-in-out;
  }
</style>