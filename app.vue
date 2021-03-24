<template>
  <div>
    <nav-bar/>
  </div>
</template>

<script>
	import navbar from './src/components/navbar.vue';

  export default{
    components:{
  	  'nav-bar': navbar,
    },
    created(){
      // document.querySelector('html').style.background = "seashell";
    },
  }
</script>

// 밑에 css는 전체에 부여할거라서 scoped안씀
<style>
  html{
    transition: all 3s;
    background: url("https://ko.stardewvalleywiki.com/mediawiki/extensions/StardewValley/images/stardewbackground.png") no-repeat fixed center center / cover;
  }
  body{
    margin: 0px;
    padding: 0px;
    margin: 20px 20px 0px;
    overflow-y: scroll;
  }
  .shadow{
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 20%);
  }
  .show-element{
    margin: 0px 50px 100px;
  }

  /* 페이지 이동시 transition부여 */
  .page-enter-active, .page-leave-active {
    transition: opacity .5s;
  }
  .page-enter, .page-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>