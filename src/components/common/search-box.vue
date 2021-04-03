<template>
  <form class="search-form-style shadow">
		<input type="text" :placeholder="getPlaceHolder" class="search-input-style" v-model="searchItem" v-on:keydown.enter.prevent="onSearch"/>
		<span class="search-button-style" @click="onSearch">
			<i class="fas fa-search"></i>
		</span>
    <section id="icon">
      <span v-if="name === 'community'" @click="onSearchChange">
        <i class="fas fa-toggle-off" v-show="targetSerach"></i>
        <i class="fas fa-toggle-on" v-show="!targetSerach"></i>
      </span>
      <span class="cancel-button-style" @click="onSearchCancel">
        <i class="fas fa-redo"></i>
      </span>
    </section>
	</form>
</template>

<script>
export default {
  props: {
    placeholder: String,
    name: String,
  },
  data(){
    return{
      searchItem: "",
      targetItem: "",
      isSearch: false,
      target: "post",
    }
  },
  methods: {
    // 검색기능 ON
		onSearch(){
      this.$emit("onSearch", this.searchItem, this.target);
      this.searchItem = "";
		},

		// 검색기능 OFF
		onSearchCancel(){
      this.$emit("onSearchCancel");
      this.searchItem = "";
		},

    onSearchChange(){
      this.target = this.target === "post" ? "user" : "post";
    }
  },
  computed: {
    getPlaceHolder(){
      if(this.target === 'post'){
        return "게시글검색";
      }
      return "유저검색";
    },
    targetSerach(){
      if(this.target === 'post'){
        return true;
      }
      return false;
    }
  }
}
</script>

<style scoped>
	.search-form-style{
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

  #icon{
    display: block;
    float: right;
  }
</style>