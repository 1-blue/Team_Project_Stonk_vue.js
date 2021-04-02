<template>
  <div>
    <template v-if="error">
			<h1>{{ error.message }}</h1>
			<p>{{ error.error }}</p>
		</template>

    <template v-else>
      <p>유저닉네임 : {{ user.nickname }}</p>
      <p>생일 : {{ user.birth }}</p>
      <p>성별 : {{ getGender }}</p>
      <p>인사말 : {{ user.phonenumber }}</p>
      <p>가입날짜 : {{ user.createdAt }}</p>
      <p>인사말 : {{ user.quote }}</p>
      <p>이미지 : 일단없음 </p>
      <p>개인정보 숨길거는 숨기면됨 글고 디자인은 모르겠음 나중에 수정하는걸로</p>
		</template>
  </div>
</template>

<script>
export default {
  data(){
    return{
      error: "",
    }
  },
  methods: {

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
    }
  },
  async created(){
    const name = this.$route.params.name;
    await this.$store.dispatch("FETCH_USER", name);
    if(this.user.error){
			this.error = this.user;
		}
  }
}
</script>

<style scoped>
  p{
    color:white;
    font-size: 20px;
  }
</style>