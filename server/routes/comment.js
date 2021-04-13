const router = require('express').Router();
const db = require('../models/index');
const { getUserId } = require('../middlewares/middleware.js');

// 댓글찾기
router.get('/:postid', async (req, res) => {
  const { postid } = req.params;

  const comments = await db.comments.findAll({ where: { postid } });

  res.json(comments);
});

// 댓글등록
router.post('/', async (req, res) => {
  const { postid, comment } = req.body;
  const userid = await getUserId(req, res);

  // 유저아이디, 포스트아이디, 댓글아이디, 댓글내용
  await db.comments.create({
    comment: comment.trim(),
    datetime: Date.now(),
    userid,
    postid,
  });

  res.redirect(`http://localhost:8080/app.html#/post/${postid}`);
});

// 대댓글 등록
router.post('/reComment', async (req, res) => {
  const { postid, commentid, comment } = req.body;
  const userid = await getUserId(req, res);

  // 유저아이디, 포스트아이디, 댓글아이디, 댓글내용
  await db.comments.create({
    comment,
    datetime: Date.now(),
    userid,
    postid,
    commentid
  });

  res.redirect(`http://localhost:8080/app.html#/post/${postid}`);
});

module.exports = router;