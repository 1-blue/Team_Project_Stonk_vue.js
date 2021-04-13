<template>
  <div class="container">
    <form action="/api/comment" method="post">
      <input type="hidden" name="postid" :value="postId">
      댓글내용 : <input type="text" name="comment">
      <button type="submit">댓글달기</button>
    </form>

    <hr />

    <ul class="comment">
      <li v-for="(comment, index) in comments" :key="index" class="comment__flex__row">
        <div v-if="!comment.commentid">
          <span>{{ index + 1 }}</span>
          <span>{{ comment.comment }}</span>

          <form action="/api/comment/reComment" method="post">
            <!-- 댓글아이디전송 -->
            <input type="hidden" name="commentid" :value="comment.id">

            <!-- 포스트아이디 -->
            <input type="hidden" name="postid" :value="postId">

            <!-- 댓글내용전송 -->
            <input type="text" name="comment">
            <button type="submit">대댓글달기</button>
          </form>
        </div>

        <!-- 대댓글보여주기 -->
        <div v-else style="color: red;">
          <span>대댓글 : </span>
          <span>{{ comment.comment }}</span>
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
    }
  },
  methods:{

  },
  computed: {
    postId(){
      return this.$route.params.postid;
    }
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
  }
}
</script>

<style scoped>
.comment{
  display: flex;
  flex-direction: column;
}

.comment__flex__row{
  display: flex;
}
</style>