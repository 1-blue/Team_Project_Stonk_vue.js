<template>
  <div class="container">
    <form action="/api/comment" method="post" class="form__comment">
      <input type="hidden" name="postid" :value="postId">

      <div>
        <input type="text" name="comment" :placeholder="`공개적으로 댓글을 남길 계정: ${username}`" class="input__comment" v-model="inputComment" >
        <span></span>
      </div>

      <button type="submit" class="input__button">댓글</button>
    </form>

    <!-- 모든 댓글들 리스트 -->
    <ul class="comment__container">
      <li v-for="(comment, index) in comments" :key="index" class="comment__flex__row">
        <div v-if="!comment.commentid">

          <!-- 각각의 댓글리스트 -->
          <ul class="comment__list">
            <div>
              <!-- 이미지 -->
              <li class="comment__image">
                <img src="../../assets/main_logo.png" alt="">
              </li>
            </div>

            <div class="comment__data">
              <!-- 댓글의 정보 -->
              <li class="comment__info">
                <span>{{ comment.nickname }}</span>
                <span>{{ comment.createdAt }}</span>
              </li>

              <!-- 댓글내용 -->
              <li class="comment__description">
                <span>{{ comment.comment }}</span>
              </li>

              <li>
                <button class="toggle_recomment">
                  답글달기
                </button>

                <!-- 대댓글달기 -->
                <form action="/api/comment/reComment" method="post" class="input__recomment">
                  <!-- 댓글아이디전송 -->
                  <input type="hidden" name="commentid" :value="comment.id">

                  <!-- 포스트아이디 -->
                  <input type="hidden" name="postid" :value="postId">

                  <!-- 댓글내용전송 -->
                  <input type="text" name="comment">
                  <button type="submit">대댓글달기</button>
                </form>
              </li>

              <!-- 대댓글 -->
              <li class="recomment__show" :data-value="comment.id" v-show="recommentNumber(comment) !== 0">
                <i class="fas fa-sort-down"></i>
                <!-- <i class="fas fa-sort-up"></i> -->
                <span>답글 {{ recommentNumber(comment) }}개 보기</span>
              </li>
            </div>
          </ul>

        </div>

        <!-- 대댓글보여주기 -->
        <div v-else>
          <ul class="recomment__list" :data-value="comment.commentid">
            <div>
              <!-- 이미지 -->
              <li class="recomment__image">
                <img src="../../assets/main_logo.png" alt="기본이미지">
              </li>
            </div>

            <div class="recomment__data">
              <!-- 댓글의 정보 -->
              <li class="recomment__info">
                <span>{{ comment.nickname }}</span>
                <span>{{ comment.createdAt }}</span>
              </li>

              <!-- 댓글내용 -->
              <li class="recomment__description">
                <span>{{ comment.comment }}</span>
              </li>
            </div>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchComments } from '../../api/fetch.js';

export default {
  data() {
    return{
      comments: {},
      inputComment: "",
    }
  },
  methods:{
    recommentNumber(comment){
      let number = 0;
      for(const item of this.comments){
        if(comment.id === item.commentid){
          number++;
        }
      }
      
      return number;
    }
  },
  computed: {
    postId(){
      return this.$route.params.postid;
    },
    username(){
			return this.$cookies.get("login_nickName").trim();
		},
  },
  async created(){
    // object형식으로 받고
    let array = await fetchComments(this.postId);

    // 정렬을 위해 배열로 변환
    let tempArray = [];
    for(const obj of array){
      tempArray.push(obj);
    }

    // 댓글 시간순 정렬
    // 대댓글 시간순 정렬 해야함
    tempArray.forEach((v, i) => {
      // 대댓글이면
      if(v.commentid){
        tempArray.forEach((value, index) => {   //댓글
          if(v.commentid === value.id){
            let temp = tempArray.splice(i, 1);

            tempArray.splice(index + 1, 0, temp[0]);
          }
        });
      }
    })
    this.comments = tempArray;
  },
  mounted(){
    // 댓글 업로드 버튼 생성
    const input = document.querySelector(".input__comment");
    const button = document.querySelector(".input__button");

    button.classList.add("unactive");

    input.addEventListener("focus", () => {
      button.classList.remove("unactive");
    });

    input.addEventListener("blur", () => {
      button.classList.add("unactive");
    });

    // 버튼활성화추가
    // 버튼 클릭되게만들기
  },
  updated(){
    const toggleRecomment = document.querySelectorAll(".toggle_recomment");
    const inputRecomment = document.querySelectorAll(".input__recomment");

    const recommentShow = document.querySelectorAll(".recomment__show");
    const recommentList = document.querySelectorAll(".recomment__list");

    // 대댓글입력 숨기기
    inputRecomment.forEach(v => v.classList.add("unactive"));

    // 대댓글입력 toggle
    toggleRecomment.forEach(v => {
      v.addEventListener('click', e => {
        v.nextSibling.nextSibling.classList.toggle("unactive")
      })
    });
    
    // 대댓글숨기기
    recommentList.forEach(v => v.classList.add("unactive"));

    // 대댓글 toggle
    recommentShow.forEach(v => {
      v.addEventListener('click', e => {
        recommentList.forEach(v => {
          if(v.dataset.value === e.currentTarget.dataset.value){
            v.classList.toggle("unactive")
          }
        });
      })
    });
  }
}
</script>

<style scoped>
input{
  padding: 0.5rem 0;
}
ul, li{
  margin: 0;
  padding: 0;
  list-style: none;
}

.unactive{
  display: none;
}

.comment__container{
  display: flex;
  flex-direction: column;
}

.comment__flex__row{
  display: flex;
}

.form__comment{
  display: flex;
  flex-direction: column;
}

.form__comment div{
  width: 100%;
  position: relative;
}

.form__comment input{
  width: 100%;
  border: none;
  background: transparent;
  border-bottom: 1px solid black;
}

.form__comment input:focus{
  outline: none;
}

.form__comment input:focus + span{
  width: 100%;
  transition: all 0.5s;
}

.form__comment span{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2.5px;
  background: black;
}

.input__button{
  align-self: flex-end;
  width: 5em;
  height: 3em;
  margin-top: 0.5em;
  border: 0px;
  background: rgb(6, 95, 212);
  font: 0.5em;
  color: white;
  border-radius: 0.2em;
  cursor: pointer;
}

.comment__list{
  display: flex;
  margin: 1em;
}

.recomment__list{
  margin: 0.5em 5em;
}

.comment__image img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid black;
  margin-right: 1em;
}

.recomment__image img{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid black;
  margin-right: 1em;
}

.comment__info, .recomment__info{
  font-size: 0.8em;
}

.comment__info span:nth-child(2), .recomment__info span:nth-child(2){
  color: gray;
}

.recomment__show{
  font-size: 0.8em;
  cursor: pointer;
  color: rgb(84, 155, 205);
}

.toggle_recomment{
  color: gray;
  border: 0;
  background: transparent;
  cursor: pointer;
}
</style>