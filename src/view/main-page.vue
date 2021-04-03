<template>
	<main>
		<!-- 메인로고 -->
		<section id="main-logo" class="shadow" style="background: rgb(0 0 0 / 0%)">
			<img src="../assets/main_logo.png"/>
		</section>

		<!-- 이미지슬라이드 -->
		<Carousel :cards="cards" />

		<!-- 게임소개 및 설명 -->
		<section id="game-info" class="shadow">
			<h1 class="info-title">STONK</h1>
			<h3>안녕하세요{{ getName }}님</h3>
			<p>이 게임은 스타듀벨리를 모델로 만든 농사경제게임입니다.</p>
			<p>일단 게임에 대한 설명</p>
			<p>일단 조작방법</p>
			<p>뭐 각종 추가할 내용들추가</p>
		</section>

	</main>
</template>

<script>
import Carousel from "../components/Carousel.vue";
import VueJwtDecode from 'vue-jwt-decode';

export default {
  components: { Carousel },
	data(){
		return{
			cards: [
    			  {
    			    headline: "Makes App available Offline",
    			    text:
    			      "By using the CachingAPI all static elements on an app can be pre-cached",
    			    imgName: "setting.svg"
    			  },
    			  {
    			    headline: "Use background sync to defer actions",
    			    text:
    			      "User inputs entered when offline are sent in the background once they get connectivity.",
    			    imgName: "cloud.svg"
    			  },
    			  {
    			    headline: "Send Push Notifications",
    			    text:
    			      "The Notifications API lets us send push notifications to re-engage users.",
    			    imgName: "antenna.svg"
    			  }
    			]
		}
	},
	computed: {
		getName(){
    		if(this.$cookies.get("login_nickName")){
       			return this.$cookies.get("login_nickName");
    		}
			else{
      			return "GUEST";
			}
 		}
	}
}
</script>

<style scoped>
	main{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#game-info{
		background: whitesmoke;
		border-radius: 20px;
		width: 100%;
	}
	.info-title{
		font-size: 100px;
		text-align: center;
		margin: 50px;
	}
	p{
		margin: 10px 20px;
	}
</style>