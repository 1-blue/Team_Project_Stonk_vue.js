<template>
  <div>
    <form action="" method="post">
      <input type="text" placeholder="title" id="title" name="title" class="shadow" />
      <br />
      <textarea type="text" placeholder="content" id="content" name="content" class="shadow" />
      <br />
      <button type="submit" class="shadow">업로드</button>
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  form{
    text-align: center;
  }
  input, textarea{
    display: inline-block;
    margin-bottom: 10px;
    outline: none;
    border: 0px;
  }
  #title{
    width: 80%;
    height: 30px;
  }
  #content{
    width: 80%;
    height: 200px;
  }
</style>