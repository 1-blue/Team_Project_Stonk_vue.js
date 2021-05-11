<template>
	<div class="community__page__container">
		<!-- 게시글 정보를 못받았을경우 에러메시지 띄워주기 -->
		<template v-if="error">
			<h1>{{ error.message }}</h1>
			<p>{{ error.error }}</p>
		</template>

		<template v-else>
			<section id="search__append__section">
				<!-- 검색기능 -->
				<search-box placeholder="게시글검색" name="community" color="orange" @onSearch="onSearch" @onSearchCancel="onSearchCancel" />

				<!-- 게시글추가기능 -->
				<div class="post__append__button" v-show="isLogin">
					<router-link to="/post/append">게시글추가하기</router-link>
				</div>
			</section>

			<!-- 게시글 -->
			<section id="post__section">
				<div class="post__container">
					<!-- v-for로 게시글 반복 -->
					<ul v-for="(post, index) in currentPosts" :key="index" v-show="!isSearch || onSearchFind(post)" class="posts">
						<li class="post">
								<ul class="post__inner">
									<!-- 타이틀 -->
									<li class="post__title" @click="visitPost(post.postid)">
										<router-link :to="`/post/${post.postid}`" class="post__title__link">
											{{ post.title }}
										</router-link>
									</li>

									<li class="post__additional__logic">
										<!-- view, comment수 -->
										<ul class="comment__number">
											<li>views : {{ post.visitnumber }}</li>
											<li>comment : {{ post.commentCount }}</li>
										</ul>

										<!-- update and delete -->
										<span v-if="onLoginUser(post.user.nickname)" class="post__update__delete__button">
											<!-- 포스트 업데이트페이지로 이동 -->
											<router-link :to="`/post/update/${post.postid}`"><i class="fas fa-pen-fancy icon"></i></router-link>
											<!-- 게시글 삭제 -->
											<i class="fas fa-trash-alt post__delete__icon icon" @click="deletePost(post.postid)"></i>
										</span>
										
										<span class="post__information">
											<!-- user-information link -->
											<router-link :to="`/user/${post.user.nickname}`" class="post__user">
												<i class="fas fa-user"></i>
												{{ post.user.nickname }}
											</router-link>
											<!-- time_ago -->
											<span class="post__time__ago">
												<i class="far fa-clock"></i>
												{{ post.createdAt }}
											</span>
										</span>
									</li>
								</ul>
						</li>
					</ul>
				</div>
				<ul class="page__router">
					<li v-for="(item, index) in pages" :key="index">
						<router-link :to="`/community/${item}`" @click.native="pageChange(item)">
							{{ item }}
						</router-link>
					</li>
				</ul>
			</section>
		</template>
	</div>
</template>

<script>
import searchBox from '../common/search-box.vue';
import { fetchVisitPost, fetchDeletePost } from '../../api/fetch.js';

export default {
	components: {
		searchBox
	},
	data(){
		return{
			searchPost: "",
			error: "",
			targetItem: "",
			isSearch: false,
			target: "post",
			page: 0,							// 현재 페이지
			divisionPage: [],			// 페이지를 지정된 개수만큼 구분한 배열
			showPostNumber: 10,		// 보여줄 포스트 개수
			currentPosts: [],			// 보여줄 포스트들을 넣을 배열
			pages: [],						// 밑에 페이지 넘기는데 사용할 배열
		}
	},
	methods: {
		onSearch(searchItem, target){
			this.targetItem = searchItem;
			this.isSearch = true;
			this.target = target;
		},
		onSearchCancel(){
			this.isSearch = false;
			this.targetItem = "";
		},
		onSearchFind(post){
			if(this.target === "post"){		//게시글검색이면
				if(post.title.toLowerCase().indexOf(this.targetItem.toLowerCase()) !== -1){
					return true;
				}
			} else {		// 유저검색
				if(post.user.nickname.toLowerCase().indexOf(this.targetItem.toLowerCase()) !== -1){
					return true;
				}
			}
			return false;
		},
		// 자신의 게시글 삭제, 업데이트기능부여
		onLoginUser(nickname){
			if(this.isLogin){
				return this.$cookies.get("login_nickName").trim() === nickname.trim();
			}
			return false;
		},
		async deletePost(postid){
			const result = await fetchDeletePost(postid);
			if(result.status === 200){
				location.reload();
			}
		},
		pageChange(pageNumber){
			this.page = pageNumber;
			this.currentPosts = this.divisionPage[this.page - 1];
		},
		async visitPost(postId){
			const data = await fetchVisitPost(postId);
			console.log(data);
		}
	},
	computed: {
		communityData(){
			if(this.$store.state.communityData.error){
				return this.$store.state.communityData
			}
			return this.$store.state.communityData.data;
		},
		isLogin(){
			return this.$store.state.isLogin;
    },
	},
	async created(){
		await this.$store.dispatch('FETCH_COMMUNITY');
		if(this.communityData.error){
			this.error = this.communityData;
			return;
		}
		this.page = this.$route.params.page === undefined ? 1 : this.$route.params.page;

		// 페이지 나눴을 때 총 몇묶음 나오는지 변수에 저장
		const pageNumber = Math.ceil(this.communityData.length / this.showPostNumber);
		this.pages = Array(pageNumber).fill().map((v, i) => i + 1);
		
		// 전체를 시간순으로 정렬
		this.communityData.sort((a, b) => Number(b.datetime) - Number(a.datetime));

		// 포스트를 지정된 개수만큼 배열로만들어서 temp에 저장
		for(let index = 0; index < this.communityData.length; index += this.showPostNumber){
			this.divisionPage.push(this.communityData.slice(index, index + this.showPostNumber));
		}

		// 현재 화면에 보여줄 포스트들 지정 (배열이라 인덱스 -1)
		this.currentPosts = this.divisionPage[this.page - 1];
	}
}
</script>

<style scoped>
.community__page__container{
	--post-append-font-size: 1.7rem;
	--community-border-color: rgb(250, 147, 5);
	--community-background-color: rgb(255, 255, 204);
	--post-hover-animation-color: snow;
	--post-decoration-size: 1em;
	--post-decoration-background-color: #ffffcc;
	--post-backgrond-color: rgb(255 252 77 / 70%);
	--post-hover-backgrond-color: grey;
	--post-title-font-size: 1.5em;
	--post-icon-hover-color: bisque;
	--post-user-hover-color: blue;
	--post-time-font-size: 0.5em;
	--post-page-link-hover-color: blue;
}

/* 기본 css수정 */
ul, li{
	padding: 0px;
	margin: 0px;
	list-style: none;
	display: inline-block;
}
a{
	text-decoration: none;
	color: black;
	transition: all 0.5s;
}

/*  */
#search__append__section{
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}
#post__section{
	display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 60vh;
	width: 100%;
	border: 2mm ridge var(--community-border-color);
	background-color: var(--community-background-color);
	border-radius: 1em;
}
.post__append__button{
	border-image: url(../../assets/post/scrollborder.png) 24 fill repeat;
  border-image-width: 24px;
  border-image-outset: 6px;
	float: right;
	font-weight: bold;
	font-size: var(--post-append-font-size);
	padding: 1rem 1.5rem;
}
.post__append__button > a{
	color: #F5683B;
}
.post__append__button > a:hover{
	color: #386CEB;
}
.post__container{
  display: flex;
  flex-direction: column;
}
.post{
	width: 100%;
	height: 100%;
}
.post__inner{
	display: flex;
  justify-content: space-between;
	align-items: center;
	padding: 0.5em 2em;
  border-bottom: 2px solid gray;
}
.post__title{
	font-size: var(--post-title-font-size);
	font-weight: bold;
}
.post__title__link{
	color: #235AB4;
}
.post__title__link:hover{
	text-decoration: underline;
}
.icon{
	margin-bottom: 1vh;
}
.icon:hover{
	color: var(--post-icon-hover-color);
	transition: all 0.5s;
}
.post__user:hover{
	color: var(--post-user-hover-color);
	transition: all 0.5s;
}
.post__time__ago{
	font-size: var(--post-time-font-size);
}
.post__additional__logic{
	display: flex;
	align-items: center;
}
.comment__number{
	display: flex;
	flex-direction: column;
	font-size: 0.8em;
	color: gray;
	margin-right: 2em;
}
.post__update__delete__button{
	display: flex;
	flex-direction: column;
	margin: 0 2vw;
}
.post__information{
	display: flex;
	flex-direction: column;
	padding-bottom: 0.5em;
}
.post__delete__icon{
	cursor: pointer;
}
.page__router{
	display: flex;
	justify-content: center;
}
.page__router > li {
	margin: 1vw;
}
.router-link-active{
	color: var(--post-page-link-hover-color);
	text-decoration: underline;
	font-weight: bold;
}
.router-link-active:hover{
	color: var(--post-page-link-hover-color);
}
@media screen and (max-width: 768px){
	.post__container{
		grid-template-columns: repeat(2, 1fr);
	}
	.post__append__button{
		font-size: 0.8em;
	}
}

</style>