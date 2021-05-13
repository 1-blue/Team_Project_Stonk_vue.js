const router = require('express').Router();
const db = require('../models/index');

let requestCounter = 1;
const unorderedItem = { 
  "parsnip": 300,
  "parsnipSeed": 10, 
  "cauliflower": 100,
  "cauliflowerSeed": 5,
  "strawberry": 500, 
  "strawberrySeed": 50, 
  "seeds": 20, 
  "icecream": 150, 
  "survivalHamburger": 80, 
  "friedEgg": 50, 
  "cheeseCauliflower": 30 
};

const itemCode = {
  "parsnip": 10,
  "parsnipSeed": 20, 
  "cauliflower": 30,
  "cauliflowerSeed": 40,
  "strawberry": 50,
  "strawberrySeed": 60,
  "seeds": 70,
  "icecream": 80,
  "survivalHamburger": 90,
  "friedEgg": 100,
  "cheeseCauliflower": 110
};



/* GET Item priece list */
router.get('/', function (req, res) {
  if (requestCounter) {
    requestCounter--;
  }
  else {
    requestCounter++;
  }
  
  res.json(unorderedItem)
});

/* GET Item priece list */
router.get('/minimum', async function (req, res) {
  //  TODO: get all item's minimum price data
  //  in game display example
  // ┌─────────────────┬────────┬───────┐
  // │ ITEM            | AMOUNT | PRICE │
  // ├─────────────────┼────────┼───────┤
  // │ seeds           |    3   |  300  │
  // │ parsnipSeed     |    4   |  100  │
  // │ cauliflowerSeed |    3   |  220  │
  // │ strawberry      |    5   |  130  │
  // │ strawberrySeed  |    2   |   50  │
  // │      ...        |        |       │
  // └─────────────────┴────────┴───────┘
  const data = await db.minimumPrices.findAll({

  })

  res.json(data)
});

router.get('/:itemCode', async function (req, res) {
  //  TODO: get item's all price data
  //  ITEM | AMOUNT | PRICE | USER | DATE(auto)
  //  in game display example
  // ┌───────┬────────┬───────┐
  // │  ITEM | AMOUNT | PRICE │
  // ├───────┼────────┼───────┤
  // │ seeds |    3   |  300  │
  // │       |    4   |  310  │
  // │       |   10   |  320  │
  // │       |   15   |  330  │
  // │       |   20   |  340  │
  // │       |        |       │
  // └───────┴────────┴───────┘
  const itemCode = req.params.itemCode;
  const data = await db.price.findAll({
    where: { itemCode }
  })

  res.json(data)


});

router.post('/', function(req, res){
  //  TODO: put posted item data to database
  //  ITEM | AMOUNT | PRICE | USER | DATE(auto)
});


module.exports = router;