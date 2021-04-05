<template>
  <div>
    <section v-if="isAuthoriztion()">
      <form :action="`api/user/password/update/${nickname}`" method="post">
        변경할 비밀번호 입력 : <input type="text" name="password" />
        확인용 비밀번호 입력 : <input type="text" name="passwordCheck" />
        <button type="submit">전송</button>
      </form>
    </section>

    <section v-else>
      <form :action="`api/user/password/${nickname}`" method="post">
        기존비밀번호 입력 : <input type="text" name="password" />
        <button type="submit">전송</button>
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
    }
  }
}
</script>

<style scoped>

</style>