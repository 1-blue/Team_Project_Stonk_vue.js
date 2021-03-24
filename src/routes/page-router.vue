<template>
    <div> 
        <div v-if="currentPage === 'main' ">
            <transition name="page">
                <main-page></main-page>
			</transition> 
        </div>
        <div v-else-if="currentPage === 'community' ">
            <transition name="page">
                <community-page></community-page>
            </transition>
        </div>
        <div v-else-if="currentPage === 'price' ">
            <transition name="page">
                <price-page></price-page>
            </transition>
        </div>
        <div v-else>일치하는 페이지가 없습니다.</div>
    </div>

</template>

<script>
import mainPage from '../view/main-page.vue';
import communityPage from '../view/community-page.vue';
import pricePage from '../view/price-page.vue';

export default({
    components:{
        mainPage,
        communityPage,
        pricePage
    },
    computed:{
        currentPage(){
            return this.$route.params.name;
        }
    }
})
</script>
