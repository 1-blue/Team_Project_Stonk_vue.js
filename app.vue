<template>
  <div>
    <nav-bar/>
    <loading-spinner :loading="loading"></loading-spinner>
	  <transition name="page">
	  	<router-view class="show__element"></router-view>
  	</transition>
  </div>
</template>

<script>
	import navbar from './src/components/navbar.vue';
  import router from './src/routes/index.js';
  import loadingSpinner from './src/components/loading-spinner.vue';
  import bus from './src/utils/bus.js';
  
  export default{
    router,
    components:{
  	  "nav-bar": navbar,
      loadingSpinner,
    },
    data(){
      return{
        loading: false,
      }
    },
    methods: {
      startSpinner(){
        this.loading = true;
      },
      endSpinner(){
        this.loading = false;
      }
    },
    created(){
      bus.$on("on:spinner", this.startSpinner);
      bus.$on("off:spinner", this.endSpinner);
      if(this.$cookies.isKey('login_nickName')){
			  this.$store.dispatch("LOGIN_SUCCESS");
      }
    },
    beforDestroy(){
      bus.$off('on:spinner', this.startSpinner);
      bus.$off("off:spinner", this.endSpinner);
    }
  }
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
  }
</script>

<style>
  html{
    transition: all 3s;
    background: url("https://ko.stardewvalleywiki.com/mediawiki/extensions/StardewValley/images/stardewbackground.png") no-repeat fixed center center / cover;
  }
  body{
    margin: 0px;
    padding: 0px;
    margin: 0px;
    overflow-y: scroll;
  }

  .show__element{
    margin: 5rem 2.5rem;
  }

  /* 페이지 이동시 transition부여 */
  .page-enter-active, .page-leave-active {
    transition: opacity .5s;
  }
  .page-enter, .page-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  /* 버튼css */
  .button{
    position: relative;
    width: 150px;
    height: 75px;
    border: 2px solid rgb(113, 87, 231);
    border-radius: 10%;
    background: white;
    cursor: pointer;
    overflow: hidden;
  }
  .button::after{
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    background: rgb(159, 140, 245);
    border-radius: 10%;
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
  .button:hover::after{
    transform: scale(1, 1);
  }
  .button:hover .button-text{
    color: black;
  }
</style>