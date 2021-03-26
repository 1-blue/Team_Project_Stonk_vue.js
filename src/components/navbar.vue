<template>
	<nav id="navbar">
		<ul class="shadow">
			<div>
				<li><router-link to="/pages/main" class="float-left link-style">Home</router-link></li>
				<li><router-link to="/pages/community" class="float-left link-style">커뮤니티</router-link></li>
				<li><router-link to="/pages/price" class="float-left link-style">시세</router-link></li>
			</div>
			
			<div>
				<li><span @click="onLogin" class="link-style">로그인</span></li>
				<li><router-link to="/pages/register" class="link-style">회원가입</router-link></li>
			</div>
		</ul>

		<!-- 로그인창 -->
		<app-modal v-if="tryLogin" @close="tryLogin = false">
			<h1 slot="header" class="modal-title">
				로그인
				<i class="fas fa-times close-modal-btn" @click="modalExit"></i>
			</h1>
			
			<div slot="body" class="modal-body">
				<div class="modal">
					<form :action="loginUrl" method="post">
							<div class="modal-input-holder">
								<div class="modal-input-id">
									<input type="text" placeholder="아이디" name="id" class="modal-input" size=15 />
								</div>
								<div class="modal-input-password">
									<input :type="checkPasswordShow" placeholder="비밀번호" name="pw" class="modal-input" size=15 />
									<i class="fas fa-eye password-icon" v-show="showPassword" @click="onShowPassword"></i>
									<i class="fas fa-eye-slash password-icon" v-show="!showPassword" @click="onShowPassword"></i>
								</div>
							</div>
							<button class="modal-btn button"> <h3 class="button-text">로그인</h3></button>
						</form>
				</div>

				<div class="modal-link">
					<div>
						<router-link to="/pages/register" class="modal-span register-router-link" @click.native="modalExit">회원가입하러가기</router-link>
					</div>
					<div>
						<span class="modal-span">비밀번호찾기</span>
					</div>
				</div>	
			</div>
		</app-modal>

	</nav>

</template>

<script>
import router from '../routes/index.js';
import appModal from './common/app-modal.vue';

export default {
	router,
	data(){
		return{
			loginUrl: "http://localhost:3000/login",
			tryLogin: false,		// 로그인시도중일때
			showPassword: false,
		}
	},
	methods:{
		onLogin(){
			this.tryLogin = true;
		},
		modalExit(){
			this.tryLogin = false
		},
		onShowPassword(){
			this.showPassword = !this.showPassword;
		}
	},
	computed: {
		checkPasswordShow(){
			if(this.showPassword){
				return "text";
			}
			else{
				return "password";
			}
		}
	},
  components:{
  	"app-modal": appModal,
	}
}
</script>

<style scoped>
	#navbar{
		position: fixed;
		top: 0px;
		left: 0px;
    	width: 100%;
    	height: 60px;
		z-index: 2;
  		transition: top 0.3s;
	}
	input:focus{
		outline: none;
	}

	.search-input-style{
    border: 0px;
    margin: 7px 0px;
    font-size: 18px;
    width: 200px;
	}
	.main-icon{
		width: 100px;
    	margin-top: 0px;
    	position: relative;
    	top: 12px;
	}
	ul{
		padding: 0;
		display: inline-block;
		/* background: linear-gradient(to bottom, #8e2de2, #4a00e0); */
		background: #0e2163;
		width: 100%;
		line-height: 60px;
		/* border-radius: 30px; */
		font-size: 20px;
		margin: 0px 0px 10px 0px;
	}
	ul > div{
		width: 40%;
		margin: 0% 5%;
		float: left;
	}
	ul li {
		display: inline-block;
		list-style: none;
		margin:0px 15px;
		font-weight: bold;
	}
	/* nav에서 오른쪽정렬 */
	ul > div:first-child+div > li {
		float:right
	}
	.modal-title{
		margin-top: 0px;
		text-align: center;
	}
	.modal-body{
		height: 130px;
		display: flex;
		flex-direction: column;
	}
	.modal-body > form{
		height: 100%;
	}
	.close-modal-btn{
		float: right;
		cursor: pointer;
		color: lightslategrey;
  }
	.button{
		border: 2px solid rgb(143, 143, 143);
	}
	.button::after{
		background: rgb(143, 143, 143);
		transform: scale(0, 1);
    transform-origin: 50% 0%;
	}
	.button-text{
		color: gray;
	}
	.close-modal-btn:hover{
		color: black;
	}
	.modal-input{
		font-size: 15px;
		border: 0px;
		background: lightgray;
	}
	.modal-input::placeholder{
		color: gray;
		font-size: 10px;
		position: absolute;
		left: 10px;
	}
	.modal-input:focus{
		top: 0;
		left: 0;
		width: 300px;
		height: 30px;
		border: 1px solid black;
		background-color: white;
		border-radius: 5px;
		z-index: 1;
	}
	.modal-input-id, .modal-input-password{
		width: 100%;
		height: 30px;
		display: flex;
		align-items: center;
		border-radius: 5px;
		background: lightgray;
		position: relative;
	}
	.password-icon{
		position: absolute;
		right: 10px;
		z-index: 3;
	}
	.modal-input-holder{
		float: left;
		width: 75%;
		height: 70px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.modal-btn{
		float: right;
		width: 90px;
		height: 70px;
	}
	.modal-span{
		font-size: 12px;
		cursor: pointer;
	}
	.password-icon{
		cursor: pointer;
	}
	.link-style{
		cursor: pointer;
		text-decoration: none;
		color: white;
	}
	.link-style:hover{
		padding-bottom: 10px;
		border-bottom: 5px solid;
		color: #E6BA43;
	}
	.link-style:active{
		color: blue;
	}
	/* 현재 페이지 a태그 색변경 */
	.router-link-exact-active {
		color: #E6BA43;
		padding-bottom: 10px;
		border-bottom: 5px solid;
	}
	.register-router-link{
		text-decoration: none;
		color: black;
		padding-bottom: 0px;
    border-bottom: 0px;
	}
</style>