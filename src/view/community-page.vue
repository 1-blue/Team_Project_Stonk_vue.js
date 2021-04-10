<template>
	<div>
		<!-- 게시글 정보를 못받았을경우 에러메시지 띄워주기 -->
		<template v-if="error">
			<h1>{{ error.message }}</h1>
			<p>{{ error.error }}</p>
		</template>

		<template v-else>
			<section id="search__append__section">
				<!-- 검색기능 -->
				<search-box placeholder="게시글검색" name="community" @onSearch="onSearch" @onSearchCancel="onSearchCancel" />

				<!-- 게시글추가기능 -->
				<router-link to="/post/append" class="post__append__button" v-show="isLogin">게시글추가하기</router-link>
			</section>

			<!-- 게시글 -->
			<section id="post__section">
				<div class="post__container">
					<!-- v-for로 게시글 반복 -->
					<ul v-for="(post, index) in currentPosts" :key="index" v-show="!isSearch || onSearchFind(post)" class="posts">
						<span></span><span></span><span></span><span></span><span></span>
						<li class="post">
								<ul class="post__inner">
									<!-- 타이틀 -->
									<li class="post__title">
										<router-link :to="`/post/${post.postid}`" class="post__title__link">
											{{ post.title }}
										</router-link>
									</li>

									<li class="post__additional__logic">
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
import searchBox from '../components/common/search-box.vue';
import { fetchDeletePost } from '../api/fetch.js';

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
			showPostNumber: 9,		// 보여줄 포스트 개수
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
				return this.$cookies.get("login_nickName") === nickname;
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
	#search__append__section{
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin: 0 3vw;
	}
	#post__section{
		width: 100%;
		height: 100%;
		border: 2mm ridge rgb(250, 147, 5);
		background-color: rgb(255, 255, 204);
		border-radius: 1em;
	}
	.post__append__button{
		float: right;
		font-weight: bold;
		font-size: 2.5vw;
		transition: all 0.5s;
	}
	.post__append__button:hover{
		transition: all 0.5s;
		color: rgb(0, 238, 255);
	}
	.post__container{
		margin: 1em 1em;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: minmax(30vh, auto);
		gap: 2vh 2vw;
	}
	.posts{
		position: relative;
	}
	.posts > span{
		display: block;
		position: absolute;
		transition: all 0.5s;
		z-index: 2;
		background: snow;
	}
	/* 요거 마우스올라갔을때 상하좌우에 효과를 위해 사용 */
	.posts > span:nth-child(1){ top: 0; left: 0; height: 5px; width: 0; }
	.posts > span:nth-child(2){ top: 0; right: 0; height: 0; width: 5px; }
	.posts > span:nth-child(3){ bottom: 0; right: 0; height: 5px; width: 0; }
	.posts > span:nth-child(4){ bottom: 0; left: 0; height: 0; width: 5px; }
	.posts:hover > span:nth-child(1) { width: 100%; }
	.posts:hover > span:nth-child(2) { height: 100%; }
	.posts:hover > span:nth-child(3) { width: 100%; }
	.posts:hover > span:nth-child(4) { height: 100%; }

	.posts > span:nth-child(5) {
		top: 10px; left: 10px;
		width: 1em;
		height: 1em;
		background-color: #ffffcc;
		border-radius: 100%;
		box-shadow: 0px 0px 5px;
		z-index: 0;
	}

	.post{
		width: 100%;
		height: 100%;
	}

	.post__inner{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		background: rgb(255 252 77 / 70%);
		height: inherit;
		transition: all 0.5s;
		padding: 0 1em;
		box-shadow: 5px 5px 5px gray;
	}
	.post__inner:hover{
		opacity: 0.8;
		background: gray;
	}
	.post__title{
		font-size: 1.5rem;
		font-weight: bold;
		padding-top: 1em;
	}
	.post__title__link:hover{
		color: white;
		transition: all 0.5s;
	}
	.icon{
		margin-bottom: 1vh;
	}
	.icon:hover{
		color: bisque;
		transition: all 0.5s;
	}
	.post__user:hover{
		color: blue;
		transition: all 0.5s;
	}
	.post__time__ago{
		font-size: 0.5em;
	}
	.post__additional__logic{
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: flex-end;
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
		color: blue;
		text-decoration: underline;
		font-weight: bold;
	}
	.router-link-active:hover{
		color: blue;
	}

	@media screen and (max-width: 768px){
		.post__container{
			grid-template-columns: repeat(2, 1fr);
		}
	}

</style>