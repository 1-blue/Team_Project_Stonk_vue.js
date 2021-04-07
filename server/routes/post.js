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
router.get('/:postid', async function (req, res) {
  const { postid } = req.params;

  const data = await db.posts.findOne({
    where: { postid },
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
router.delete('/:postid', isLoggedIn, async (req, res) => {
  const { postid } = req.params;
  await db.posts.destroy({ where: { postid } });
  res.send("success");
});

// 게시글업데이트 put -> post변경
router.post('/:postid', isLoggedIn, async (req, res) => {
  const { postid } = req.params;
  const { title, contents } = req.body;

  await db.posts.update({
    title,
    contents,
  }, {
    where: { postid }
  });

  res.redirect("http://localhost:8080/app.html#/pages/community");
});

module.exports = router;