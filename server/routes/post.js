const router = require('express').Router();
const db = require('../models/index');
const { isLoggedIn } = require("../middlewares/middleware.js");

// 게시글전체에대한 정보 전달
router.get('/', async function (req, res) {
  // 지금은 전체검색이지만 게시글 많아지면 페이지 나눌거를 생각해서
  // 나중에 10 ~ 15개씩받아서 화면에 뿌려주게 바꿀생각임

  const data = await db.posts.findAll({
    include: [
      {
        model: db.users,
        attributes: ['nickname']
      }
    ]
  });

  res.send(data)
});

// 게시글업로드 put으로해야하는건가
router.post('/', isLoggedIn, function (req, res) {
  const { title, contents } = req.body;
  // db에 추가
  db.posts.create({
    title,
    id: req.userId,
    contents,
    createddate: Date.now()
  });

  res.redirect('http://localhost:8080/app.html#/pages/community');
});

// 게시글 상세정보 전송
router.get('/:title', async function (req, res) {
  // db에서 req.params.title값으로 title값과 같은 게시글 존재하는지 찾고
  const { title } = req.params;

  const data = await db.posts.findOne({
    where: { title },
    include: [
      {
        model: db.users,
        attributes: ['nickname']
      }
    ]
  });

  return res.send(data);
});

// 게시글삭제
router.delete('/:title', async (req, res) => {
  const { title } = req.params;
  await db.posts.destroy({ where: { title } });
  res.send("success");
});

// 게시글업데이트
router.put('/:previousTitle', async (req, res) => {
  const { previousTitle } = req.params;
  const { title, comtents } = req.body;

  await db.posts.updata({
    title,
    comtents,
  }, {
    where: { title: previousTitle }
  });

  res.send("success");
});

module.exports = router;