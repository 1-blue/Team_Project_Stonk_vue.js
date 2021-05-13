const router = require('express').Router();

const itemInfomation = { 
  "parsnip": "당근과 비슷한, 봄철 덩이줄기 식물. 대지의 맛이 나고 영양분이 듬뿍 들어있습니다.",
  "parsnipSeed": "파스닙의 씨앗", 
  "cauliflower": "값이 비싸지만, 천천히 자랍니다. 창백한 색과는 다르게, 꽃 부분에 영양소가 풍부합니다.\n콜리플라워는 거대 작물이 생길 수 있습니다.",
  "cauliflowerSeed": "콜리플라워의 씨앗", 
  "strawberry": "많은 사람들이 좋아하는 달콤하고 과즙이 많은 매력적인 붉은색 과일.\n지속적으로 생산합니다. 4일에 한번씩 줄기마다 1개씩 수확가능하며 낮은 확률로 더 많은 딸기가 나올 확률이 있습니다.", 
  "strawberrySeed": "딸기의 씨앗", 
  "seeds": "이것저것 다 섞여있습니다. 심어보고 무엇이 자라는지 봅시다!", 
  "icecream": "이건 싫어하는 사람이 거의 없습니다.", 
  "survivalHamburger": "탐험가를 위한 간편한 간식.", 
  "friedEgg": "한쪽만 익힌 계란 프라이.", 
  "cheeseCauliflower": "매우 푹신푹신합니다." 
};

router.get('/:name', function (req, res) {
  const { name } = req.params;
  
  return res.send(itemInfomation[`${name}`]);
});

module.exports = router;