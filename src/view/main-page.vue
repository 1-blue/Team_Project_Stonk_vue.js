<template>
	<main>
		<!-- 이미지슬라이드영역 -->
		<!-- <section id="image-slide" class="shadow">
			<img :src="currentImage" alt="">
			<i class="fas fa-chevron-left icon-left" @click="previousImage"></i>
			<i class="fas fa-chevron-right icon-right" @click="nextImage"></i>
		</section> -->

		<!-- 이미지슬라이밑에 이미지선택할 수 있는 circle영역 -->
		<!-- <section id="image-order-circle">
			<ul>
				<li v-for="(image, index) in images" :key="index">
					<template v-if="currentImageIndex !== index">
						<i class="far fa-circle" @click="onClickImage(index)" ></i>
					</template>
					<template v-else>
						<i class="fas fa-circle"></i>
					</template>
				</li>
			</ul>
		</section> -->
		<section id="game-info" class="shadow" style="background: rgb(0 0 0 / 0%)">
			<img src="../assets/main_logo.png"/>
		</section>

		<!-- inserted -->
		<Carousel :cards="cards" />
		<!-- insert end -->

		<!-- 게임소개 및 설명 -->
		<section id="game-info" class="shadow">
			<h1 class="info-title">STONK</h1>
			<p>이 게임은 스타듀벨리를 모델로 만든 농사경제게임입니다.</p>
			<p>일단 게임에 대한 설명</p>
			<p>일단 조작방법</p>
			<p>뭐 각종 추가할 내용들추가</p>
		</section>

		<section id="game-info" class="shadow">
			<h1 class="info-title">STONK</h1>
			<p>이 게임은 스타듀벨리를 모델로 만든 농사경제게임입니다.</p>
			<p>일단 게임에 대한 설명</p>
			<p>일단 조작방법</p>
			<p>뭐 각종 추가할 내용들추가</p>
		</section>

	</main>
</template>

<script>
//inserted
import Carousel from "../components/Carousel.vue";
//insert end

  export default {
	  components: { Carousel },
		data(){
			return{
				images: [
					"https://www.stardewvalley.net/wp-content/uploads/2020/12/1_5_promo_square_3x.png",
					"https://www.stardewvalley.net/wp-content/uploads/2020/12/EpsqHnXVoAAXMR0-1024x619.png",
					"https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg?t=1611793703",
					"https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt7225731dfb1a126a/60249b80f4a7946af0338313/LoL-Patch-Notes-11-4-Article-Banner.jpg"
				],
				currentImage: "",
				currentImageIndex: 0,
				timeInterval: 500,
				timerId: 0,
				//inserted
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
	  			//insert end
			}
		},
		methods: {
			previousImage(){
				this.currentImageIndex--
				if(this.currentImageIndex < 0){
					this.currentImageIndex = this.images.length - 1;
				}
				this.currentImage = this.images[this.currentImageIndex];
			},
			nextImage(){
				this.currentImageIndex++
				if(this.currentImageIndex >= this.images.length){
					this.currentImageIndex = 0;
				}
				this.currentImage = this.images[this.currentImageIndex];
			},
			onClickImage(index){
				this.currentImageIndex = index;
				this.currentImage = this.images[this.currentImageIndex];
			}
		},
		computed: {

		}
  }
</script>

<style scoped>
	main{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#image-slide{
		position: relative;
		width: 60%;
		height: 70vh;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 5mm ridge rgb(255, 255, 255);
	}
	img {
		width: 100%;
		height: 100%;
	}
	.icon-left{
		position: absolute;
		top: 264px;
		left: -70px;
		color: white;
		font-size: 60px;
		cursor: pointer;
	}
	.icon-right{
		position: absolute;
		top: 264px;
		right: -70px;
		color: white;
		font-size: 60px;
		cursor: pointer;
	}
	ul{
		padding: 0px;
	}
	li{
		display: inline-block;
		list-style: none;
		margin: 0px 10px;
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