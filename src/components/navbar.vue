<template>
	<nav>
		<ul class="shadow">
			<div>
				<li><router-link to="/pages/main" class="float-left link-style">메인로고</router-link></li>
				<li><router-link to="/pages/community" class="float-left link-style">커뮤니티</router-link></li>
				<li><router-link to="/pages/price" class="float-left link-style">시세</router-link></li>
			</div>
			
			<div>
				<li><span @click="onLogin" class="link-style">로그인</span></li>
				<li><span @click="onAuth" class="link-style">회원가입</span></li>
			</div>
		</ul>

		<transition name="page">
			<router-view class="show-element"></router-view>
		</transition>
		<!-- 회원가입창 -->
		<app-modal v-if="isAuth" @close="isAuth = false">
		<h1 slot="header" class="modal-title">
			회원가입
			<i class="fas fa-times close-modal-btn" @click="modalExit"></i>
		</h1>
		
		<div class="modal-body" slot="body">
					<form action="post">
						<div class="modal-input-holder">
							<div>
								<label for="id">아이디 : </label>
								<input type="text" name="id" class="modal-input"/>
							</div>
							<div>
								<label for="pw">비밀번호 : </label>
								<input type="password" name="pw" class="modal-input"/>
							</div>
							<div>
								<label for="pw">비밀번호확인 : </label>
								<input type="password" name="pw" class="modal-input"/>
							</div>
						</div>

						
						<button class="modal-btn">회원가입</button>
					</form>
				</div>
		</app-modal>


		<!-- 로그인창 -->
		<app-modal v-if="isLogin" @close="isLogin = false">
		<h1 slot="header" class="modal-title">
			로그인
			<i class="fas fa-times close-modal-btn" @click="modalExit"></i>
		</h1>
		
		<div slot="body" class="modal-body">
			<div class="modal-input">
				<form action="post">
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
					<span @click="onAuth" class="modal-span">회원가입하러가기</span>
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

	/* 현재 페이지 a태그 색변경 */
	.router-link-exact-active {
		color: white;
	}

	ul{
		padding: 0;
		display: inline-block;
		background-color: pink;
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
	}
	.link-style:hover{
		color: white;
	}
	.link-style:active{
		color: blue;
	}
</style>