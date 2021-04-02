<template>
  <div>
    <template v-if="error">
			<h1>{{ error.message }}</h1>
			<p>{{ error.error }}</p>
    </template>

    <template v-else>
      <h1>{{ post.title }}</h1>
      <p v-html="post.contents" />
      <router-link :to="`/user/${post.id}`">
        <i class="fas fa-user"></i>
        {{ post.id }}
      </router-link>
      <p>
        <i class="far fa-clock"></i>
        {{ post.createddate }}
      </p>
    </template>

  </div>
</template>

<script>
export default {
  data(){
    return{
      error: "",
    }
  },
  methods: {

  },
  computed: {
    post(){
      if(this.$store.state.post.error){
        return this.$store.state.post
      }
      return this.$store.state.post.data;
    }
  },
  async created(){
    const title = this.$route.params.title;
    await this.$store.dispatch('FETCH_POST', title);
    if(this.post.error){
			this.error = this.post;
		}
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
    color: black;
  }
</style>