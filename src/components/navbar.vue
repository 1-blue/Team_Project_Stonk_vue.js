<template>
	<nav>
		<ul class="shadow">
			<div>
				<li><router-link to="/pages/main" class="float-left link-style"><img src="https://stardewvalleywiki.com/mediawiki/images/6/68/Main_Logo.png" class="main-icon" /></router-link></li>
				<li><router-link to="/pages/community" class="float-left link-style">커뮤니티</router-link></li>
				<li><router-link to="/pages/price" class="float-left link-style">시세</router-link></li>
			</div>
			
			<div>
				<li><span @click="onLogin" class="link-style">로그인</span></li>
				<li><router-link to="/pages/register" class="link-style">회원가입</router-link></li>
			</div>
		</ul>

		<transition name="page">
			<router-view class="show-element"></router-view>
		</transition>

		<!-- 로그인창 -->
		<app-modal v-if="tryLogin" @close="tryLogin = false">
			<h1 slot="header" class="modal-title">
				로그인
				<i class="fas fa-times close-modal-btn" @click="modalExit"></i>
			</h1>
			
			<div slot="body" class="modal-body">
				<div class="modal-input">
					<form :action="loginUrl" method="post">
							<div class="modal-input-holder">
								<div>
									<label for="id">아이디 : </label>
									<input type="text" name="id" class="modal-input" size=15;/>
								</div>
								<div>
									<label for="pw">비밀번호 : </label>
									<input type="password" name="pw" class="modal-input" size=15/>
								</div>
							</div>
							<button class="modal-btn">로그인</button>
						</form>
				</div>

				<div class="modal-link">
					<div>
						<span class="modal-span">회원가입하러가기</span>
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
		}
	},
	methods:{
		onLogin(){
			this.tryLogin = true;
		},
		modalExit(){
			this.tryLogin = false
		},
	},
  components:{
  	"app-modal": appModal,
	}
}
</script>

<style scoped>
	.main-icon{
		width: 100px;
    margin-top: 0px;
    position: relative;
    top: 12px;
	}
	ul{
		padding: 0;
		display: inline-block;
		background: linear-gradient(to bottom, #8e2de2, #4a00e0);
		width: 100%;
		line-height: 80px;
		border-radius: 30px;
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
	.modal-input{
		margin-bottom: 10px;
		margin-right: 10px;
		float: right;
		font-size: 18px;
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
	.link-style{
		cursor: pointer;
		text-decoration: none;
		color: black;
	}
	.link-style:hover{
		padding-bottom: 21px;
		border-bottom: 5px solid;
		color: white;
	}
	.link-style:active{
		color: blue;
	}
	/* 현재 페이지 a태그 색변경 */
	.router-link-exact-active {
		color: white;
		padding-bottom: 21px;
		border-bottom: 5px solid;
	}
</style>