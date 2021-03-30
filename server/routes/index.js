var express = require('express');
var router = express.Router();

let requestCounter = 1;

/* GET home page. */
router.get('/', function (req, res, next) {

  res.send("ok")
});

const unorderedItem = { "parsnip": 300, "parsnipSeed": 10, "cauliflower": 100, "cauliflowerSeed": 5, "strawberry": 500, "strawberrySeed": 50, "seeds": 20, "icecream": 150, "survivalHamburger": 80, "friedEgg": 50, "cheeseCauliflower": 30 };

const items = Object.keys(unorderedItem).sort().reduce(
  (obj, key) => {
    obj[key] = unorderedItem[key];
    return obj;
  },
  {}
);

/* GET Item priece list */
router.get('/price', function (req, res, next) {
  // res.setHeader("access-control-allow-origin", "*");
  if (requestCounter) {
    res.json(items)
    requestCounter--;
  }
  else {
    res.json(items)
    requestCounter++;
  }
});

user = ["first", "second", "third"];


// ================ postsInfo전송 (모든포스트정보 배열로 전달) ===========================
const postInfo = [
  {
    "user": "first",
    "title": "first-title",
    "time_ago": "1 hours ago"
  },
  {
    "user": "second",
    "title": "second-title",
    "time_ago": "2 hours ago"
  }
]

// ================ posts전송 (입력받은 포스트 세부내용) 임시 db대체 ===========================
const posts = [
  {
    "title": "first-title",
    "user": "first",
    "time_ago": "1 hours ago",
    "content": "첫번째 유저가 적은 게시글 내용 🐱‍🏍😢🐱‍🏍🐱‍🏍😢🐱‍🏍😢🎶🎶🎶🤷‍♂️🎶🎶🤷‍♂️🤷‍♂️✔💕🤦‍♀️🐱‍👤🤣🤣💋🐱‍🐉💖🙌🤷‍♀️"
  },
  {
    "title": "second-title",
    "user": "second",
    "time_ago": "2 hours ago",
    "content": "두번째 유저가 적은 게시글 세부내용~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  }
]

// ================= user에대한 임시 db ============================ 
const users = [
  {
    "name": "first",
    "upload": 1,
    "comment": "안녕하세요 첫번째유저입니다."
  },
  {
    "name": "second",
    "upload": 2,
    "comment": "hello 두번째유저입니다."
  }
]

// 게시글전체에대한 정보 전달
router.get('/postInfo', function (req, res, next) {
  res.setHeader("access-control-allow-origin", "*");
  res.send(postInfo)
});

// 게시글 세부내용 전달
router.get('/post/:title', function (req, res, next) {
  res.setHeader("access-control-allow-origin", "*");

  // db에서 req.params.title값으로 title값과 같은 게시글 존재하는지 찾고
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].title === req.params.title) {
      return res.send(posts[i]);
    }
  }

  // 이거 status코드적어서 전달 500
  return res.send("일치하는 게시글 없음");
});

// 게시물 추가
router.post('/post', function (req, res, next) {
  //인증단계
    //todo: autherization user
  //인증 완료
  // db에 추가
  console.log(req.body.contents)
  res.redirect('/app.html#/pages/community');
  
});


// 유저 세부내용 전달
router.get('/user/:name', function (req, res, next) {
  res.setHeader("access-control-allow-origin", "*");

  // db에서 req.params.title값으로 title값과 같은 게시글 존재하는지 찾고
  for (let i = 0; i < posts.length; i++) {
    if (users[i].name === req.params.name) {
      return res.send(users[i]);
    }
  }

  // 이거 status코드적어서 전달 500
  return res.send("일치하는 유저 없음");
});



//======================로그인정보=======================
router.post('/login', function (req, res, next) {
  const {id, password} = req.body;

  // 일치하면 뭘리턴해줘야할까?
  return res.send(`로그인요.. id : ${id} | password : ${password}`);
});

router.post('/auth', function (req, res, next) {
  const {id, password, passwordCheck, comment} = req.body;

  // 일치하면 뭘리턴해줘야할까?
  return res.send(`회원가입요  id : ${id} | password : ${password} | passwordCheck : ${passwordCheck} | comment : ${comment}  `);
});






/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
