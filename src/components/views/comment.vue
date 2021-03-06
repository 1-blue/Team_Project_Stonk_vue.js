<template>
  <div class="comment__container">
    <form action="/api/comment" method="post" class="form__comment">
      <input type="hidden" name="postid" :value="postId">

      <div v-if="isLoggin">
        <input type="text" name="comment" :placeholder="`공개적으로 댓글을 남길 계정: ${username}`" class="input__comment" v-model="inputComment" >
        <span></span>
      </div>

      <div v-else>
        <p>댓글을 입력하려면 로그인하세요</p>
      </div>

      <div class="input__comment__focus">
        <p class="input__comment__focus__cancel">취소</p>
        <button type="submit" class="input__comment__button" :disabled="commentBtnState">댓글</button>
      </div>
    </form>

    <!-- 모든 댓글들 리스트 -->
    <ul class="comments__list">
      <li v-for="(comment, index) in comments" :key="index" class="comments__item">
        <!-- 각각의 댓글리스트 -->
        <ul v-if="!comment.commentid" class="comment__list">
          <div>
            <!-- 이미지 -->
            <li class="comment__image">
              <img src="../../assets/main_logo.png" alt="기본이미지">
            </li>
          </div>
          <div class="comment__data">
            <!-- 댓글의 정보 -->
            <li class="comment__info">
              <span>{{ comment.nickname }}</span>
              <span><i class="far fa-clock"></i> {{ commentUploadTime(comment.datetime) }}</span>
            </li>
            <!-- 댓글내용 -->
            <li class="comment__description">
              <span>{{ comment.comment }}</span>
            </li>
            <li>
              <button class="toggle__recomment" v-if="isLoggin">답글달기</button>
              <button class="remove__comment" v-if="isLoggin && isMyComment" @click="removeComment(comment.id)">삭제</button>
              <!-- 대댓글달기 -->
              <form action="/api/comment/reComment" method="post" class="input__recomment">
                <!-- 댓글아이디전송 -->
                <input type="hidden" name="commentid" :value="comment.id" >
                <!-- 포스트아이디 -->
                <input type="hidden" name="postid" :value="postId">
                <!-- 댓글내용전송 -->
                <input type="text" name="comment" v-model="inputRecomment">
                <button type="submit" class="recomment__submit" :disabled="recommentBtnState">답글</button>
              </form>
            </li>
            <!-- 대댓글 -->
            <li class="recomment__show" :data-value="comment.id" v-show="recommentNumber(comment) !== 0">
              <i class="fas fa-sort-down allow__icon" :data-value="comment.id"></i>
              <i class="fas fa-sort-up allow__icon" :data-value="comment.id"></i>
              <span>답글 {{ recommentNumber(comment) }}개 보기</span>
            </li>
          </div>
        </ul>
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
                <span><i class="far fa-clock"></i> {{ commentUploadTime(comment.datetime) }}</span>
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
import { fetchComments, fetchDeleteComments } from '../../api/fetch.js';

export default {
  data() {
    return{
      comments: {},
      inputComment: "",
      inputRecomment: "",
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
    },
    formatDate(datetime, format) {        // 시간변환기
      const date = new Date(Number(datetime));

      const map = {
          mm: date.getMonth() + 1,
          dd: date.getDate(),
          yy: date.getFullYear().toString().slice(-2),
          yyyy: date.getFullYear(),
          h: date.getUTCHours() + 9,    // 시차적용
          m: date.getMinutes(),
          s: date.getSeconds(),
      };

      return format.replace(/mm|dd|yy|yyy|h|m|s/gi, matched => map[matched]);
    },
    commentUploadTime(dateTime){
      const date = new Date(Number(dateTime));

      // 초단위 경과시간
      let time = (new Date() - date) / 1000;

      if(time < 60){                              // 1분 이하인경우 (초단위로 표시)
        return `${Math.floor(time)}초전`;
      } else if(time < 60 * 60){                  // 1시간 이하인경우 (분단위로 표시)
        return `${Math.floor(time / 60)}분전`;
      } else if(time < 60 * 60 * 24){             // 1일 이하인경우 (시간단위로 표시)
        return `${Math.floor(time / 60 / 24)}시간전`;
      } else if(time < 60 * 60 * 24 * 31){        // 1달 이하인경우 (일단위로 표시)
        return `${Math.floor(time / 60 / 24 / 31)}일전`;
      } else if(time < 60 * 60 * 24 * 31 * 12){   // 1년 이하인경우 (달단위로 표시)
        return `${Math.floor(time / 60 / 24 / 31 / 12)}달전`;
      } else {                                    // 년 단위로 표시
        return `${Math.floor(time / 60 / 24 / 31 / 12 / 12)}년전`;
      }
    },
    async removeComment(commentId){
      const data = await fetchDeleteComments(commentId);
      if(data === "success"){
        return alert("댓글삭제성공");
      }
      alert("댓글삭제실패");
    }
  },
  computed: {
    postId(){
      return this.$route.params.postid;
    },
    username(){
			return this.$cookies.get("login_nickName").trim();
		},
    isLoggin(){
      return this.$store.state.isLogin;
    },
    commentBtnState(){
      return this.inputComment.length !== 0 ? false : true;
    },
    recommentBtnState(){
      return this.inputRecomment.length !== 0 ? false : true;
    },
    isMyComment(){
      const nickname = this.$cookies.get("login_nickName");
      return this.comments[0].nickname.trim() === nickname.trim();
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

    /**
     * 대댓글 역순정렬을 위한 변수
     * 좀 많이 편법이긴한데
     * 지금 방식이 댓글시간순서대로 배열에 정렬하고
     * 댓글바로밑에다가 대댓글 끼워넣어서 배열출력인데
     * 대댓글끼리 정렬하기가 까다로워서
     * 애초에 댓글넣을 때 같은 commentid를 가진 대댓글이면 한칸씩 밑에 끼워넣음
     * ( 입력순서대로 불러와서 엉키진않는것같음 )
     */
    const recommentSortVar = {};

    tempArray.forEach((v, i) => {
      // 대댓글이면
      if(v.commentid){
        tempArray.forEach((value, index) => {
          
          if(v.commentid === value.id){
            // 대댓글 역순정렬
            if(!recommentSortVar[`${v.commentid}`]){
              recommentSortVar[`${v.commentid}`] = 1;
            } else {
              recommentSortVar[`${v.commentid}`]++;
            }

            // 댓글의 위치 바로 밑으로 이동
            let temp = tempArray.splice(i, 1);
            tempArray.splice(index + recommentSortVar[`${v.commentid}`], 0, temp[0]);
          }
        });
      }
    });
    this.comments = tempArray;
  },
  mounted(){
    // 댓글 업로드 버튼 포커스지정
    const input = document.querySelector(".input__comment");
    const inputFocus = document.querySelector(".input__comment__focus");
    const inputFocusCancel = document.querySelector(".input__comment__focus__cancel");

    // 로그인안했으면 댓글입력창 생략
    if(!this.isLoggin){
      return;
    }

    input.addEventListener("focus", () => {
      inputFocus.classList.add("active");
    });

    inputFocusCancel.addEventListener('click', (e) => {
      inputFocus.classList.remove("active");
    });
  },
  updated(){
    const toggleRecomment = document.querySelectorAll(".toggle__recomment");

    const recommentShow = document.querySelectorAll(".recomment__show");
    const recommentList = document.querySelectorAll(".recomment__list");
    const allowIcon = document.querySelectorAll(".allow__icon");

    // 대댓글 보이는 화살표 아이콘 up / down
    allowIcon.forEach((v, i) => {
      if(i % 2 !== 0){
        return;
      }
      v.classList.add("allow__active");
    });

    // 대댓글입력 toggle
    toggleRecomment.forEach(v => {
      v.addEventListener('click', () => {
        v.nextSibling.nextSibling.nextSibling.nextSibling.classList.toggle("active")
      });
    });

    // 대댓글 toggle
    recommentShow.forEach(v => {
      v.addEventListener('click', e => {
        let count = 0;
        recommentList.forEach(value => {
          if(value.dataset.value === e.currentTarget.dataset.value){
            value.classList.toggle("active")

            // 화살표 토글설정
            if(count !== 0){
              return;
            }
            count++;
            allowIcon.forEach(v => {
              if(v.dataset.value === e.currentTarget.dataset.value){
                v.classList.toggle("allow__active");
              }
            });
          }
        });
      })
    });
  }
}
</script>

<style scoped>
.comment__container{
  --comment-image-size: 40px;
  --recomment-image-size: 20px;
  --comment-input-btn-color: rgb(6, 95, 212);
  --recomment-show-btn-color: rgb(84, 155, 205);
  --disabled-btn-color: lightgray;
  --comment-interval: 1em;
  --recomment-interval: 5em;
}

input{
  padding: 0.5rem 0;
}
ul, li{
  margin: 0;
  padding: 0;
  list-style: none;
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

.input__comment__focus{
  display: none;
  justify-content: flex-end;
}

.input__comment__button{
  width: 5em;
  height: 3em;
  margin-top: 0.5em;
  border: 0px;
  background-color: var(--comment-input-btn-color);
  font: 0.5em;
  color: white;
  border-radius: 0.2em;
  cursor: pointer;
}

.input__comment__focus__cancel{
  border: 0;
  width: 2.5em;
  background: transparent;
  cursor: pointer;
}

.comments__list{
  display: flex;
  flex-direction: column;
}

.comments__item{
  display: flex;
}

.comment__list{
  display: flex;
  margin: var(--comment-interval);
  width: 100%;
}

.comment__image img{
  width: var(--comment-image-size);
  height: var(--comment-image-size);
  border-radius: 50%;
  border: 1px solid black;
  margin-right: 1em;
}

.comment__data{
  width: 100%;
}

.comment__data li{
  padding-bottom: 0.3em;
}

.comment__info, .recomment__info{
  font-size: 0.75em;
}

.comment__info span:nth-child(2), .recomment__info span:nth-child(2){
  color: gray;
  padding-left: 1em;
  font-size: 0.6em;
}

.comment__description span{
  font-size: 1em;
}

.recomment__list{
  display: none;
  margin: 0.5em var(--recomment-interval);
}

.recomment__image img{
  width: var(--recomment-image-size);
  height: var(--recomment-image-size);
  border-radius: 50%;
  border: 1px solid black;
  margin-right: 1em;
}

.recomment__show{
  font-size: 0.8em;
  cursor: pointer;
  color: var(--recomment-show-btn-color);
}

.allow__icon{
  display: none;
}

.toggle__recomment, .remove__comment{
  color: gray;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.input__recomment{
  display: none;
  flex-direction: column;
  width: 100%;
}

.input__recomment input{
  border: 0;
  border-bottom: 2px solid lightblue;
  background: transparent; 
  width: 100%;
}

.input__recomment input:focus{
  outline: none;
  border-bottom: 2px solid blue;
}

.input__recomment button{
  align-self: flex-end;
  width: 3em;
  height: 2em;
  margin-top: 0.5em;
  border: 0px;
  background: var(--comment-input-btn-color);
  font: 0.4em;
  color: white;
  border-radius: 0.1em;
  cursor: pointer;
}

.unactive{
  display: none;
}

.active{
  display: flex;
}

.allow__active{
  display: inline-block;
}

button:disabled{
  background: var(--disabled-btn-color);
  cursor: not-allowed;
}
</style>