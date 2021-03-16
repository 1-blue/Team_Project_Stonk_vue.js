<template>
	<div id="item-table">
		<div id="table-header">
			<div class="table-gride image">이미지</div>
			<div class="table-gride name">아이템명</div>
			<div class="table-gride price">가격</div>
			<div class="table-gride created_at">업데이트시간</div>
		</div>
		<div id="table-body">
			<div v-for="(imageName, index) in imageList" :key="index" id="items">
				<div class="table-gride image"><img :src="getPath(imageName)" alt=""></div>
				<div class="table-gride name">{{getImageName(imageName)}}</div>
				<div class="table-gride price">가격받아서넣기</div>
				<div class="table-gride created_at">시간받아서넣기</div>
			</div>
		</div>
	</div>
</template>

<script>
/**
 * import fs from 'fs' 오류나가지고 이유도모르겠고 일단스킵
 * 나중에 된다고 가정하고 일단 수동으로 이미지명 imageList에 추가
 */
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
			 * await axios.get('/price/name')
			 * 이런느낌으로다가 받으면 되는건가
			 */
		}
	}
}
</script>

<style scoped>
	img{
		width: 50px;
		height: 50px;
		margin-top: 5px;
	}
	#table-header, #items{
		display: flex;
		flex-direction: row;	/* 아이템방향 */
		flex-wrap: nowrap;		/* 아이템 넘치면 크기줄이기 */
		/* flex-flow: dir wrap; 로 축약가능 */
		justify-content: flex-start;
	}
	.table-gride{
		height: 60px;
		border: 1px solid white;
		text-align: center;
		line-height: 60px;
		background-color: lightgray;
	}
	#table-header:hover > .table-gride{
		background: gray;
	}
	#items:hover > .table-gride{
		background: lightslategray;
	}
	.image{
		width: 100px;
		flex-grow: 1;
	}
	.name{
		width: 200px;
		flex-grow: 2;
	}
	.price{
		width: 200px;
		flex-grow: 2;
	}
	.created_at{
		width: 250px;
		flex-grow: 3;
	}

</style>