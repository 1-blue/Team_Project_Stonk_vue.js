const router = require('express').Router();
const db = require('../models/index');
const { isLoggedIn } = require("../middlewares/middleware.js");

// 게시글전체에대한 정보 전달
router.get('/', async function (req, res) {
  const data = await db.posts.findAll({
    include: [
      {
        model: db.users,
        attributes: ['nickname']
      }
    ]
  });

  let idx = 0;

  for(const value of data){
    const commentCount = await db.comments.findAll({ where: { postid: value.postid } });

    data[idx++].dataValues.commentCount = commentCount.length;
  }

  res.json(data)
});

// 게시글업로드
router.post('/', isLoggedIn, function (req, res) {
  const { title, contents } = req.body;
  // db에 추가
  db.posts.create({
    title,
    id: req.userId,
    contents,
    datetime: Date.now()
  });

  res.redirect('/app.html#/community/1');
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

  return res.json(data);
});

// visitNumber++
router.put('/:postid', async function (req, res) {
  const { postid } = req.params;

  try {
    const data = await db.posts.findOne({ where: { postid } });

    await db.posts.update(
      {
        visitnumber: (data.visitnumber + 1)
      },
      {
        where: { postid }
      }
    );

    return res.send("success");

  } catch (error) {
    console.error(error);
    return res.send(error);
  }
});

// 게시글삭제
router.delete('/:postid', isLoggedIn, async (req, res) => {
  const { postid } = req.params;

  // 포스트삭제
  await db.posts.destroy({ where: { postid } });

  res.send("success");
});

// 게시글업데이트
router.post('/:postid', isLoggedIn, async (req, res) => {
  const { postid } = req.params;
  const { title, contents } = req.body;

  await db.posts.update({
    title,
    contents,
    datetime: Date.now(),
  }, {
    where: { postid }
  });

  res.redirect("/app.html#/community/1");
});

module.exports = router;