<template>
	<nav id="navbar">
		<ul class="navbar__container">
			<!-- home -->
			<li><router-link to="/home" class="link home__link">Home</router-link></li>

			<!-- community, price -->
			<div class="responsive__flex__direction">
				<li><router-link to="/community" class="link community__link">커뮤니티</router-link></li>
				<li><router-link to="/price" class="link price__link">시세</router-link></li>
			</div>
			
			<!-- auth -->
			<div v-if="!isLogin" class="responsive__flex__direction">
				<li><span @click="onLogin" class="link login__link">로그인</span></li>
				<li><router-link to="/register" class="link register__link">회원가입</router-link></li>
			</div>
			<div v-else class="responsive__flex__direction">
				<li><router-link to="/home/#" @click.native="onLogout" class="link logout__link">로그아웃</router-link></li>
				<li><router-link :to="myInfoPage" class="link my__information__link">내 정보</router-link></li>
			</div>
			
			<!-- hamburger -->
			<li class="hamburger__menu">
				<i class="fas fa-bars"></i>
			</li>
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
							<span class="login-fail-message">{{loginAdditionalText}}</span>
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
						<router-link to="/register" class="modal-span register-router-link" @click.native="modalExit">회원가입하러가기</router-link>
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
import { fetchLogout } from "../api/fetch.js";

export default {
	router,
	data(){
		return{
			loginUrl: "api/auth/login",
			tryLogin: false,		// 로그인시도중일때
			showPassword: false,
			loginAdditionalText: "",
		}
	},
	methods:{
		onLogin(){
			this.tryLogin = true;
		},
		modalExit(){
			this.tryLogin = false;
			this.loginAdditionalText = "";
		},
		onShowPassword(){
			this.showPassword = !this.showPassword;
		},
		onLogout(){
				fetchLogout();
    		location.reload();		// 일단이거안붙이면 데이터랑 화면이 일치를 안해가지고 붙임
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
		isLogin(){
			return this.$store.state.isLogin;
    },
		myInfoPage(){
			const nickname = this.$cookies.get("login_nickName");
			return `/user/${nickname}`
		}
	},
  components:{
  	"app-modal": appModal,
	},
	mounted(){
		if(this.$route.query.state === "loginFail"){
			this.tryLogin = true;
			this.loginAdditionalText = "아이디 혹은 비밀번호가 일치하지않습니다.\n재확인후 다시시도해주세요."
		}
		if(this.$route.query.state === "passwordChangeSuccess"){
			this.tryLogin = true;
			this.loginAdditionalText = "비밀번호 변경에 성공했습니다. 다시 로그인해주세요."
		}

		const hamber = document.querySelector(".hamburger__menu");
		const links = [];
		links.push(document.querySelector(".community__link"));
		links.push(document.querySelector(".price__link"));
		links.push(document.querySelector(".login__link"));
		links.push(document.querySelector(".register__link"));
		links.push(document.querySelector(".logout__link"));
		links.push(document.querySelector(".my__information__link"));

		// 햄버그메뉴클릭시 링크들보여줌
		hamber.addEventListener('click', () => {
			links.forEach(link => {
				if(link === null){
					return;
				}
				link.classList.toggle("active");

				// 링크클릭시 햄버그메뉴닫기
				link.addEventListener('click', () => {
					links.forEach((value) => {
						if(value === null){
							return;
						}
						value.classList.remove("active");
					});
				})
			});
		});

		// 홈링크 클릭시 햄버그메뉴 닫기
		document.querySelector(".home__link").addEventListener('click', () => {
			links.forEach((value) => {
				if(value === null){
					return;
				}
				value.classList.remove("active");
			});
		})
	},
	beforeDestroy(){
		this.loginAdditionalText = "";
	}
}
</script>

<style scoped>
	#navbar{
		position: fixed;
		top: 0px;
		left: 0px;
    width: 100%;
    height: 3rem;
		z-index: 9999;
  	transition: top 0.3s;
	}

	input:focus{
		outline: none;
	}

	.navbar__container{
		width: 100%;
		margin: 0px 0px 10px 0px;
		padding: 0;
		font-size: 1.2rem;
		line-height: 60px;
		background: #0e2163;
		display: flex;
		justify-content: space-between;
	}
	
	.navbar__container li {
		list-style: none;
		margin: 0px 1em;
		font-weight: bold;
	}

	.responsive__flex__direction{
		display: flex;
		flex-direction: row;
	}

	.link {
		cursor: pointer;
		text-decoration: none;
		color: white;
		padding-bottom: 10px;
	}

	.link:hover{
		border-bottom: 5px solid;
		color: #E6BA43;
	}

	.hamburger__menu{
		display: none;
		color: white;
		font-size: 1.5em;
	}

	@media screen and (max-width: 768px){
		.link {
			display: none;
		}
		.home__link{
			display: inline-block;
		}
		.hamburger__menu{
			display: inline-block;
			position: absolute;
			top: 0;
			right: 0;
		}
		.active{
			display: inline-flex;
		}
		.navbar__container{
			flex-direction: column;
		}
		.responsive__flex__direction{
			flex-direction: column;
			align-items: center;
		}
		.link:hover{
			background: #E6BA43;
			color: black;
			border: 0;
			padding: 0 30vw;
			border-radius: 0.5em;
			margin: 0.3em 0;
		}
		.home__link:hover{
			border-bottom: 5px solid;
			padding: 0;
			border-radius: 0;
			margin: 0;
			color: #E6BA43;
			background-color: #0e2163;
		}
	}

	/* ===분리=== */

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
		margin-top: 10px;
	}
	.modal-btn{
		float: right;
		width: 90px;
		height: 70px;
		margin-top: 10px;
	}
	.modal-span{
		font-size: 12px;
		cursor: pointer;
	}
	.password-icon{
		cursor: pointer;
	}

	/* 현재 페이지 a태그 색변경 */
	.router-link-exact-active {
		color: #E6BA43;
		border-bottom: 5px solid;
	}
	.register-router-link{
		text-decoration: none;
		color: black;
		padding-bottom: 0px;
    border-bottom: 0px;
	}
	.login-fail-message{
		color: red;
		font-size: 12px;
	}
</style>