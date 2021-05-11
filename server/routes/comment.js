const router = require('express').Router();
const db = require('../models/index');
const { getUserId } = require('../middlewares/middleware.js');

// 댓글찾기
router.get('/:postid', async (req, res) => {
  const { postid } = req.params;

  // 포스트에 참조된 댓글모두 찾기
  // 댓글에 참조된 유저의 닉네임 가져오기
  const comments = await db.comments.findAll({ where: { postid } });

  let temp = [];
  let idx = 0;

  for(const comment of comments){
    temp.push(await db.users.findAll({ 
      where: { id: comment.userid },
      attributes: ['nickname']
    }));
  }

  for(const value of temp){
    comments[idx].dataValues.nickname = value[0].dataValues.nickname;
    idx++;
  }

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

  res.redirect(`/app.html#/post/${postid}`);
});

// 댓글삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const targetComment = await db.comments.findOne({ where: { id }})
    await db.comments.destroy({ where: { id: targetComment.id } })
    
  } catch (error) {
    console.error(error);
  }

  res.send("success");
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

  res.redirect(`/app.html#/post/${postid}`);
});

module.exports = router;