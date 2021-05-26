<template>
	<main>
		<!-- 메인로고 -->
		<!-- <section id="main__logo" class="shadow" style="background: rgb(0 0 0 / 0%)">
			<img src="../../assets/main_logo.png"/>
		</section> -->

		<!-- 이미지슬라이드 -->
		<Carousel :cards="cards" />

		<!-- 게임소개 및 설명 -->
		<section id="game__info" class="shadow">
			<h1 class="game__info__title">STONK</h1>
			<p class="p_title">안녕하세요{{ getName }}님!</p>
			<p>Stardew Valley는 오픈 엔드형 농장 체험 RPG입니다!</p>
			<p>여러분은 스타듀 밸리에 있는 할아버지의 오래된 농장을 물려받게 됩니다. </p>
			<p>대대로 전해 내려오는 도구와 코인 몇 개로 무장하고 새로운 삶을 시작하게 됩니다. </p>
			<p>자급자족하면서 웃자란 농경지를 잘 나가는 내 농장으로 탈바꿈 시킬 수 있을까요? </p>
			<p>쉽지는 않을 겁니다. 조자 코퍼레이션이 마을에 찾아온 뒤로 예전부터 고수하던 삶의 방식이 사라지고 있기 때문이지요. </p>
			<p>마을에서 가장 활발한 곳이던 마을 회관은 이제 엉망이 되고 말았습니다. </p>
			<p>하지만 스타듀 밸리엔 다양한 기회가 있습니다. </p>
			<p>여러분이 조금만 노력한다면 스타듀 밸리에 과거의 영광을 되찾아주는 영웅이 될 수도 있습니다!</p>
		<img src="/src/assets/Banner_Right.png" style="float: right;">

		</section>
	</main>
</template>

<script>
import Carousel from "../Carousel.vue";

export default {
  components: { Carousel },
	data(){
		return{
			cards: [
    			  {
    			    headline: "Makes App available Offline",
    			    text:
    			      "By using the CachingAPI all static elements on an app can be pre-cached",
    			    imgName: "ingame.png"
    			  },
    			  {
    			    headline: "Use background sync to defer actions",
    			    text:
    			      "User inputs entered when offline are sent in the background once they get connectivity.",
    			    imgName: "npc_interaction.png"
    			  },
    			  {
    			    headline: "Send Push Notifications",
    			    text:
    			      "The Notifications API lets us send push notifications to re-engage users.",
    			    imgName: "plant_plants.png"
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
		font-family: sans-serif, "맑은 고딕";
		display: flex;
		flex-direction: column;
		align-items: center;
		
	}
	#game__info{
		background: whitesmoke;
		border-radius: 0.5rem;
		width: 100%;
		border: 2mm ridge rgb(250, 147, 5);
  	background-color: rgb(255, 255, 204);
	}
	.game__info__title{
		font-size: 100px;
		text-align: center;
		margin: 50px;
	}
	p{
		margin: 10px 20px;
	}
	.p_title{
		font-size: 30px;
	}
</style>