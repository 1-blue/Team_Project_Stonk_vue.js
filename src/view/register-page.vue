<template>
  <div id="register-center" class="shadow">
    <section id="title">
      <h1 id="h1-tag">STONK</h1>
      <h3>회원가입</h3>
    </section>
    <section id="">
      <form action="http://localhost:3000/auth" method="post" id="register-form">
        <input type="text" placeholder="아이디입력" name="id" />
        <input type="password" placeholder="비밀번호입력" name="password" />
        <input type="password" placeholder="비밀번호확인" name="passwordCheck" />
        <input type="text" placeholder="간단한 자기소개" name="comment" />
        <div>
          <button type="submit">
            <h1 class="button-text">회원가입</h1>
          </button>
        </div>
      </form>
    </section>
  </div>

</template>

<script>
export default {

}
</script>

<style scoped>
  #register-center {
    margin: 50px;
    text-align: center;
    border: 2px solid black;
    background: white;
    border-radius: 20px;
    width: 30%;
    height: 100%;
    float: right;
  }
  #register-form{
    text-align: center;
    margin-top: 20px;
  }
  #h1-tag{
    font-size: 50px;
    margin: 10px;
  }
  input{
    display: inline-block;
    width: 75%;
    height: 35px;
    margin: 10px 0px;
    outline: none;
    border: 0px;
    border-bottom: 2px solid black;
  }
  input:focus{
    border-bottom: 2px solid rgb(74, 74, 226);
  }
  button{
    margin: 40px 0px;
    position: relative;
    width: 150px;
    height: 75px;
    border: 2px solid rgb(113, 87, 231);
    border-radius: 10px;
    background: white;
    cursor: pointer;
    overflow: hidden;
  }
  button::after{
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    background: rgb(159, 140, 245);
    border-radius: 10px;
    width: 100%;
    height: 100%;
    z-index: 1;
    transform: translateY(100%);
    transition: transform 0.35s;
  }
  .button-text{
    position: relative;
    z-index: 2;
    color: rgb(113, 87, 231);
    transition: 0.35s;
  }
  button:hover::after{
    transform: scale(1, 1);
  }
  button:hover .button-text{
    color: black;
  }
</style>