<template>
	<div>
		<template v-if="error">
			<h1>{{ error.message }}</h1>
			<p>{{ error.error }}</p>
		</template>

		<template v-else>
			<section id="additional-section">
				<!-- 검색기능 -->
				<search-box placeholder="게시글검색" name="community" @onSearch="onSearch" @onSearchCancel="onSearchCancel" />

				<!-- 게시글추가기능 -->
				<router-link to="/post/append" class="append-post-link" v-show="isLogin">게시글추가하기</router-link>
			</section>

			<!-- 게시글 -->
			<section id="post-section">
				<div class="posts">
					<hr/>
					<!-- v-for로 게시글 반복 -->
					<div v-for="(post, index) in communityData" :key="index">
						<span v-show="!isSearch || onSearchFind(post)" id="items">
							<div class="post-inner-margin">
								<router-link :to="`/post/${post.title}`" class="post-title">
									{{ post.title }}
								</router-link>
								<span class="float-right">
									<span v-if="onLoginUser(post.user.nickname)">
										<!-- <i class="fas fa-pen"></i> -->
										<!-- 포스트 업데이트페이지로 이동 -->
										<span class="post-update-icon">수정</span>
										<i class="fas fa-trash-alt post-delete-icon" @click="deletePost(post.title)"></i>
									</span>
									<router-link :to="`/user/${post.id}`" class="post-user">
										<i class="fas fa-user"></i>
										{{ post.user.nickname }}
									</router-link>
									<span class="post-time-ago">
										<i class="far fa-clock"></i>
										{{ post.createddate }}
									</span>
								</span>
							</div>
							<hr />
						</span>
					</div>
				</div>
			</section>
		</template>
	</div>
</template>

<script>
import searchBox from '../components/common/search-box.vue';
import { fetchDeletePost } from '../api/fetch.js';
//fetchUpdatePost

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
				if(post.id.toLowerCase().indexOf(this.targetItem.toLowerCase()) !== -1){
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
		async updatePost(){
			// 업데이트
			// 새로운페이지열고 새로적은데이터 전송
		},
		async deletePost(title){
			const result = await fetchDeletePost(title);
			if(result.status === 200){
				location.reload();
			}
		},
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
			// let check = false;
			// if(this.$cookies.isKey('access_token')){
			// 	check =	VueJwtDecode.decode(this.$cookies.get("access_token")).iss == "stonk";
			// }
      // return check;
    },
	},
	async created(){
		await this.$store.dispatch('FETCH_COMMUNITY');
		if(this.communityData.error){
			this.error = this.communityData;
		}
	}
}
</script>

<style scoped>
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
	#post-section{
		width: 100%;
		height: 1000px;
		border: 3mm ridge rgba(50, 75, 220, 0.6);
	}
	.posts{
		margin: 0px 20px;
	}
	.post-title{
		font-size: 25px;
		font-weight: bold;
	}
	.post-title:hover{
		color: rgb(255, 56, 99);
		transition: all 1s;
	}
	.post-user:hover{
		color: rgb(17, 0, 255);
		transition: all 1s;
	}
	.post-time-ago{
		font-size: 10px;
	}
	.post-user::before{
		content: " | ";
	}
	.post-time-ago::before{
		content: " | ";
	}
	.post-inner-margin{
		margin: 0px 10px;
	}
	a{
		text-decoration: none;
		color: black;
		transition: all 3s;
	}
	.append-post-link{
		float: right;
		font-weight: bold;
		font-size: 30px;
		position: relative;
		top: 20px;
		transition: all 3s;
	}
	.append-post-link:hover{
		transition: all 1.5s;
		color: rgb(0, 238, 255);
	}

	.float-right{
		float: right;
	}

	.post-update-icon, .post-delete-icon{
		cursor: pointer;
	}

</style>