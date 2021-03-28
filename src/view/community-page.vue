<template>
	<div>
		<template v-if="error">
			<h1>{{ error.message }}</h1>
			<p>{{ error.error }}</p>
		</template>

		<template v-else>
			<section id="additional-section">
				<!-- 검색기능 -->
				<form class="search-form-style shadow">
					<input type="text" placeholder="게시글검색" class="search-input-style" v-model="searchPost" v-on:keydown.enter.prevent="onSearch"/>
					<span class="search-button-style" @click="onSearch">
						<i class="fas fa-search"></i>
					</span>
					<span class="cancel-button-style" @click="onSearchCancel">
						<i class="fas fa-redo"></i>
					</span>
				</form>

				<!-- 게시글추가기능 -->
				<router-link to="/post/append" class="append-post-link">게시글추가하기</router-link>
			</section>

			<!-- 게시글 -->
			<section id="post-section">
				<div class="posts">
					<hr/>
					<!-- v-for로 게시글 반복 -->
					<div v-for="(post, index) in posts" :key="index">
						<div class="post-inner-margin">
							<router-link :to="`/post/${post.title}`" class="post-title">
								{{ post.title }}
							</router-link>
							<span class="float-right">
								<router-link :to="`/user/${post.user}`" class="post-user">
									<i class="fas fa-user"></i>
									{{ post.user }}
								</router-link>
								<span class="post-time-ago">
									<i class="far fa-clock"></i>
									{{ post.time_ago }}
								</span>
							</span>
						</div>
						<hr />
					</div>
				</div>
			</section>
		</template>
	</div>
</template>

<script>
import { fetchPostInfo } from '../api/fetch.js';

export default {
	data(){
		return{
			searchPost: "",
			posts: [],
			error: "",
		}
	},
	methods: {
		onSearch(){
		},
		onSearchCancel(){
		}
	},
	async created(){
		const posts = await fetchPostInfo();
		if(posts.error){
			this.error = posts;
		} else {
			this.posts = posts.data;
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

</style>