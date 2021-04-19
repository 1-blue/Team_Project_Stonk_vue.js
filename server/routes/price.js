const router = require('express').Router();

let requestCounter = 1;
const unorderedItem = { 
  "parsnip": 300,
  "parsnipSeed": 10, "cauliflower": 100,
  "cauliflowerSeed": 5, 
  "strawberry": 500, 
  "strawberrySeed": 50, 
  "seeds": 20, 
  "icecream": 150, 
  "survivalHamburger": 80, 
  "friedEgg": 50, 
  "cheeseCauliflower": 30 
};

/* GET Item priece list */
router.get('/', function (req, res) {
  if (requestCounter) {
    requestCounter--;
  }
  else {
    requestCounter++;
  }
  
  res.send(unorderedItem)
});




module.exports = router;