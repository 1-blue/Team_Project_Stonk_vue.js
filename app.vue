<template>
  <div>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
	import navbar from './components/navbar.vue';

  export default{
    components:{
  	  'nav-bar': navbar,
    }
  }
</script>

// 밑에 css는 전체에 부여할거라서 scoped안씀
<style>
  html{
    background-color: seashell;
  }
  body{
    margin: 0px;
    padding: 0px;
    margin: 20px 140px 0px;
    overflow-y: scroll;
  }
  .shadow{
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 20%);
  }
  .margin-rigth-left{
    margin: 0px 50px;
  }
</style>