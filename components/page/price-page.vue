<template>
	<div id="item-table">
        <form class="search-form-style shadow">
            <input type="text" placeholder="아이템검색" class="search-input-style" v-model="searchItem" v-on:keydown.enter.prevent="onSearch"/>
            <span class="search-button-style" @click="onSearch">
                <i class="fas fa-search"></i>
            </span>
			<span class="cancel-button-style" @click="onSearchCancel">
				<i class="fas fa-redo"></i>
			</span>
        </form>

		<div id="table-header">
			<div class="table-gride image">이미지</div>
			<div class="table-gride name">아이템명</div>
			<div class="table-gride price">가격</div>
		</div>

		<div id="table-body">
			<div v-for="(imageName, index) in imageList" :key="index" id="items">
				<div class="table-gride image" v-show="onSearchFind(imageName) || !isSearch"><img :src="getPath(imageName)" alt=""></div>
				<div class="table-gride name" v-show="onSearchFind(imageName)  || !isSearch">{{getImageName(imageName)}}</div>
				<div class="table-gride price" v-show="onSearchFind(imageName)  || !isSearch">가격받아서넣기</div>
			</div>
		</div>
		
	</div>
</template>

<script>

const imageList = [
	'계란후라이.png',
	'딸기.png',
	'딸기씨앗.png',
	'생존식버거.png',
	'씨앗모음.png',
	'아이스크림.png',
	'치즈콜리플라워.png',
	'콜리플라워.png',
	'콜리플라워씨앗.png',
	'파스닙.png',
	'파스닙씨앗.png'
]

export default {	
	data(){
		return{
			imagePath: "../../image/items/",
			imageList,
			searchItem: "",
			targetItem: "",
			isSearch: false,
		}
	},
	methods: {
		getPath(imageName){
			return this.imagePath + imageName;
		},
		getImageName(imageName){
			return imageName.split('.')[0];
		},
		getPrice: async function(imageName){
			/**
			 * const name = this.getImageName(imageName);
			 * const itemPrice = await axios.get('/price')
			 * 이런느낌으로다가 받으면 되는건가
			 */
		},
		onSearch(){
			this.targetItem = this.searchItem;
			this.searchItem = "";
			this.isSearch = true;
		},
		onSearchFind(imageName){
			return this.targetItem === this.getImageName(imageName);
		},
		onSearchCancel(){
			this.isSearch = false;
			this.searchItem = "";
			this.targetItem = "";
		}
	}
}
</script>

<style scoped>
	/* 이미지태그 크기 및 위치지정 */
	img{
		width: 50px;
		height: 50px;
		margin-top: 5px;
	}

	/* 테이블제목들이랑 아이템들 정렬을 위해 값적용 */
	#table-header, #items{
		display: flex;
		flex-direction: row;	/* 아이템방향 */
		flex-wrap: nowrap;		/* 아이템 넘치면 크기줄이기 */
		/* flex-flow: dir wrap; 로 축약가능 */
		justify-content: flex-start;
	}

	/* 테이블제목 색지정 */
	#table-header > div{
		background: gray;
	}

	/* 테이블 각 요소마다 간격등의 값지정 */
	.table-gride{
		height: 60px;
		border: 1px solid white;
		text-align: center;
		line-height: 60px;
		background-color: lightgray;
	}

	/* 테이블에 마우스 올렸을때 한라인 색변화 (테이블제목전용) */
	#table-header:hover > .table-gride{
		background: rgb(54, 51, 51);
	}

	/* 테이블에 마우스 올렸을때 한라인 색변화 */
	#items:hover > .table-gride{
		background: lightslategray;
	}

	/* 이미지grid값적용 */
	.image{
		width: 100px;
		flex-grow: 1;
	}

	/* 이름grid값적용 */
	.name{
		width: 200px;
		flex-grow: 2;
	}

	/* 가격grid값적용 */
	.price{
		width: 200px;
		flex-grow: 2;
	}

	/* 생성시간grid값적용 */
	.created_at{
		width: 250px;
		flex-grow: 3;
	}

	/* ================검색기능스타일=================== */
	/* 검색폼태그 */
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
</style>