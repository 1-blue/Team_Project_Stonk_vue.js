<template>
	<nav>
		<ul class="text-align-left">
			<li><router-link to="/pages/main" class="float-left">메인로고</router-link></li>
			<li><router-link to="/pages/info" class="float-left">정보</router-link></li>
			<li><router-link to="/pages/price" class="float-left">시세</router-link></li>
			<span @click="onLogin">로그인</span>
			<span @click="onAuth">회원가입</span>
		</ul>

		<!-- 로그인창 -->
  	<app-modal v-if="isLogin" @close="isLogin = false">
  	  <h1 slot="header" class="modal-title">
  	    로그인
  	    <i class="fas fa-times close-modal-btn" @click="modalExit"></i>
  	  </h1>
	
  	  <div slot="body">
				<form action="post">
					<button class="modal-btn">로그인</button>
					<label for="id">아이디 : </label>
					<input type="text" name="id" class="modal-input"/>
					<br />
					<label for="pw">비밀번호 : </label>
					<input type="password" name="pw" class="modal-input"/>
				</form>

				<span @click="onAuth" class="modal-span">회원가입하러가기</span>
				<span class="modal-span">비밀번호찾기</span>
			</div>
  	</app-modal>

		<!-- 회원가입창 -->
		<app-modal v-if="isAuth" @close="isAuth = false">
  	  <h1 slot="header" class="modal-title">
  	    회원가입
  	    <i class="fas fa-times close-modal-btn" @click="modalExit"></i>
  	  </h1>
	
  	  <div slot="body">
				<form action="post">
					<button class="modal-btn">회원가입</button>
					<label for="id">아이디 : </label>
					<input type="text" name="id" class="modal-input"/>
					<br />
					<label for="pw">비밀번호 : </label>
					<input type="password" name="pw" class="modal-input"/>
					<br />
					<label for="pw">비밀번호확인 : </label>
					<input type="password" name="pw" class="modal-input"/>
				</form>
			</div>
  	</app-modal>

		<router-view class="text-align-left"></router-view>
	</nav>
</template>

<script>
import router from '../routes/router.js';
import appModal from './common/app-modal.vue';

export default {
	router,
	data(){
		return{
			isLogin: false,
			isAuth: false,
		}
	},
	methods:{
		onLogin(){
			this.isLogin = true;
		},
		onAuth(){
			this.isLogin = false;
			this.isAuth = true;
		},
		modalExit(){
			this.isLogin = false
			this.isAuth = false
		},
	},
  components:{
  	"app-modal": appModal,
	}
}
</script>

<style scoped>
	a{
		text-decoration: none;
	}
	ul{
		position: fixed;
		top: 0px;
    left: 220px;
		display: inline-block;
		background-color: pink;
		width: 1000px;
		height: 100px;
		line-height: 100px;
		border-radius: 30px;
		font-size: 20px;
		margin-top: 0px;
	}
	ul > li {
		display: inline-block;
		list-style: none;
		margin-right: 30px;
	}
	.text-align-left{
		text-align: left;
	}
	.text-align-left{
		text-align: left;
	}
	.modal-title{
		margin-top: 0px;
	}
	.close-modal-btn{
    float: right;
    cursor: pointer;
    color: lightslategrey;
  }
	.modal-input{
		margin-top: 15px;
	}
	.modal-btn{
		float: right;
		width: 90px;
		height: 100px;
	}
	.modal-span{
		display: inline-block;
		margin-top: 111px;
		margin-left: 68px;
		font-size: 12px;
		cursor: pointer;
	}
	form > label, form > input {
		
	}
</style>