<template>
  <div>
    <!-- 기존패스워드와 불일치 에러 -->
    <h1 v-if="discordError === 'passwordDiscord'">
      기존 패스워드와 입력하신 패스워드가 다릅니다.
    </h1>

    <!-- 변경패스워드 두개가 불일치함 -->
    <h1 v-if="discordError === 'notEqual'">
      변경하려고 입력하신 패스워드두개가 서로 다릅니다.
    </h1>

    <section v-if="isAuthoriztion()">
      <form :action="`api/user/password/update/${nickname}`" method="post" class="password-form">
        <ul>
          <li>
            <label for="password">변경할 비밀번호 입력</label>
            <input type="password" name="password" />
          </li>
          <li>
            <label for="passwordCheck">확인용 비밀번호 입력</label>
            <input type="password" name="passwordCheck" id="passwordCheck" />
          </li>
        </ul>
        <button type="submit" class="password-submit">전송</button>
      </form>
    </section>

    <section v-else>
      <form :action="`api/user/password/${nickname}`" method="post" class="password-form">
        <ul>
          <li>
            <label for="password">기존패스워드</label>
            <input type="password" name="password" id="password" />
          </li>
        </ul>
        <button type="submit" class="password-submit">전송</button>
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
    discordError(){
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
    padding: 1vh 0;
    list-style: none;
  }

  input{
    display: inline-block;
    width: 60%;
    height: 35px;
    margin: 10px 0px;
    outline: none;
    border: 0px;
    border-bottom: 2px solid black;
  }

  input:focus{
    border-bottom: 2px solid rgb(74, 74, 226);
  }

  label{
    color: blue;
  }
  
  .password-form{
    background: white;
    border-radius: 20px;
    width: 35%;
    padding: 1.5% 4%;
    display: flex;
    flex-direction: column;
  }

  .password-form li {
    padding-bottom: 10%;
  }

  .password-submit{
    border-radius: 10px;
    height: 10vh;
    border: 0;
    background: lightskyblue;
    margin-bottom: 5%;
  }

  .password-submit:hover{
    background: blue;
    color: white;
    cursor: pointer;
  }
</style>