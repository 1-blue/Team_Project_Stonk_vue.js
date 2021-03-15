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
    margin: 130px 300px 0px;
  }
  .shadow{
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
  }
</style>