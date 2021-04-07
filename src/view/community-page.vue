<template>
	<div>
		<!-- 게시글 정보를 못받았을경우 에러메시지 띄워주기 -->
		<template v-if="error">
			<h1>{{ error.message }}</h1>
			<p>{{ error.error }}</p>
		</template>

		<template v-else>
			<section id="additional__section">
				<!-- 검색기능 -->
				<search-box placeholder="게시글검색" name="community" @onSearch="onSearch" @onSearchCancel="onSearchCancel" />

				<!-- 게시글추가기능 -->
				<router-link to="/post/append" class="post__append__button" v-show="isLogin">게시글추가하기</router-link>
			</section>

			<!-- 게시글 -->
			<section id="post__section">
				<div class="post__table">
					<hr />
					<!-- v-for로 게시글 반복 -->
					<div v-for="(post, index) in currentPosts" :key="index">
						<span v-show="!isSearch || onSearchFind(post)" id="items">
								<ul class="post__list">
									<!-- 타이틀 -->
									<li>
										<router-link :to="`/post/${post.postid}`" class="post__title">
											{{ post.title }}
										</router-link>
									</li>

									<li class="post__additional__logic">
										<!-- update and delete -->
										<span v-if="onLoginUser(post.user.nickname)" class="post__update__delete">
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
												{{ post.createddate }}
											</span>
										</span>
									</li>
								</ul>
							<hr />
						</span>
					</div>

					<ul class="page__router">
						<li v-for="(item, index) in pages" :key="index">
							<router-link :to="`/community/${item}`" @click.native="pageChange(item)">
								{{ item }}
							</router-link>
						</li>
					</ul>
				</div>
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
			divisionPage: [],				// 페이지를 지정된 개수만큼 구분한 배열
			showPostNumber: 5,		// 보여줄 포스트 개수
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
		this.page = this.$route.params.page;

		// 페이지 나눴을 때 총 몇묶음 나오는지 변수에 저장
		let pageNumber = Math.ceil(this.communityData.length / this.showPostNumber);
		this.pages = Array(pageNumber).fill().map((v, i) => i + 1);

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
		transition: all 3s;
	}
	hr{
		width: 100%;
	}
	/* =============검색창 css=========== */
	.search-form-style{
		display: inline-block;
    background-color: white;
    width: 400px;
    height: 50px;
    line-height: 50px;
    border-radius: 5px 5px 5px 5px;
		text-align: center;
		margin-bottom: 40px;
	}
	/* 검색인풋태그 */
	.search-input-style{
    border: 0px;
    margin: 7px 0px;
    font-size: 18px;
    width: 200px;
	}
	/* 검색인풋태그기본 스타일없애기 */
	.search-input-style:focus{
    outline: 0px;
  }
	/* 검색버튼태그 */
	.search-button-style{
  	background: linear-gradient(to right, #6478FB, #8763FB);
  	height: 50px;
  	width: 50px;
  	display: block;
  	float: right;
  	border-radius: 0px 5px 5px 0px;
  	cursor: pointer;
	}
	.cancel-button-style{
    height: 50px;
    width: 50px;
    display: block;
    float: right;
    border-radius: 0px 5px 5px 0px;
    cursor: pointer;
	}

	/* =============게시글 css=========== */
	#post__section{
		width: 100%;
		height: 100%;
		border: 3mm ridge rgba(50, 75, 220, 0.6);
	}
	.post__append__button{
		float: right;
		font-weight: bold;
		font-size: 30px;
		position: relative;
		top: 20px;
		transition: all 3s;
	}
	.post__append__button:hover{
		transition: all 1.5s;
		color: rgb(0, 238, 255);
	}
	.post__table{
		margin: 0px 20px;
		display: flex;
		flex-direction: column;
	}
	.post__list{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.post__title{
		font-size: 25px;
		font-weight: bold;
	}
	.post__title:hover{
		color: rgb(255, 56, 99);
		transition: all 1s;
	}
	.icon{
		margin-bottom: 1vh;
	}
	.icon:hover{
		color: bisque;
		transition: all 0.5s;
	}
	.post__user:hover{
		color: rgb(17, 0, 255);
		transition: all 1s;
	}
	.post__time__ago{
		font-size: 10px;
	}
	.post__additional__logic{
		display: flex;
		align-items: center;
	}
	.post__update__delete{
		display: flex;
		flex-direction: column;
		margin: 0 2vw;
	}
	.post__information{
		display: flex;
		flex-direction: column;
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

</style>