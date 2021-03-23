<template>
    <div> 
        <div v-if="currentPage === 'main' ">
            <transition name="page">
                <main-page></main-page>
			</transition> 
        </div>
        <div v-else-if="currentPage === 'info' ">
            <transition name="page">
                <info-page></info-page>
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
import infoPage from '../view/info-page.vue';
import pricePage from '../view/price-page.vue';

export default({
    components:{
        mainPage,
        infoPage,
        pricePage,
    },
    computed:{
        currentPage(){
            return this.$route.params.name;
        }
    }
})
</script>
