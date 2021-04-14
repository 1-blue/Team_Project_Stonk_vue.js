const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const bcrypt = require('bcrypt');
const { nicknameOverlapCheck, idOverlapCheck } = require("../middlewares/middleware.js");

require('dotenv').config({ path: __dirname + "/../.env" });

// register.. id or nickname은 미들웨어로 중복체크
router.post('/register', idOverlapCheck, nicknameOverlapCheck, async function (req, res) {
  const { id, pw, passwordCheck, nickname, year, month, day, gender, phoneNumber1, phoneNumber2, phoneNumber3, quote, profileimage } = req.body;

  // 월, 일이 한자리일경우 맨앞에 0붙여줌
  let tempMonth = month;
  let tempDay = day;
  if (month < 10) {
    tempMonth = `0${month}`
  }
  if (day < 10) {
    tempDay = `0${day}`
  }
  const birth = `${year}-${tempMonth}-${tempDay}`
  const phonenumber = `${phoneNumber1}-${phoneNumber2}-${phoneNumber3}`

  // 패스워드중복체크
  if (pw !== passwordCheck) {
    return res.redirect("/app.html#/register?error=passwordError");
  }

  //pw암호화
  const hash = await bcrypt.hash(pw, 5);

  db.users.create({
    id,
    pw: hash,
    nickname,
    birth,
    gender: (gender === "male" ? "T" : "F"),
    phonenumber,
    quote: quote.trim(),
    profileimage: "profileImage TEST"
  });

  return res.redirect("/app.html#/home");
});

// login
router.post('/login', async function (req, res) {
  const { id, pw } = req.body;

  const currentUser = await db.users.findOne({ where: { id } });
  if (currentUser) {
    if (await bcrypt.compare(pw, currentUser.pw)) {
      // 쿠키등록
      const token = jwt.sign(
        {
          nickname: currentUser.nickname,
          id: currentUser.id,
        },
        process.env.JWT_SECRET_KEY,
        {
          algorithm: "HS256", // 해싱 알고리즘
          expiresIn: "60m",  // 토큰 유효 기간
          issuer: "stonk" // 발행자
        }
      );

      res.cookie("access_token", token, { httpOnly: true });
      res.cookie("login_nickName", currentUser.nickname, { httpOnly: false });
      return res.redirect('/app.html#/home');
    }
  }

  return res.redirect("/app.html#/home?state=loginFail");
});

// logout
router.get("/logout", function (req, res) {
  res.clearCookie("access_token");
  res.clearCookie("login_nickName");

  res.redirect("/app.html#/home")
})

// sign out
router.delete("/signOut/:nickname", async function (req, res) {
  const { nickname } = req.params;

  try {
    // nickname으로 유저찾고
    const currentUser = await db.users.findOne({ where: { nickname } });

    if(!currentUser){
      return res.send("userNotFound");
    }

    // 유저와 연동된 post의 postid 찾고
    const posts = await db.posts.findAll({
      where: { id: currentUser.id },
      attributes: ['postid'],
    });

    // 유저와 연동된 comments의 id 및 대댓글 찾고
    const comments = await db.comments.findAll({
      where: { userid: currentUser.id },
      attributes: ['id', 'commentid'],
    });

    // 대댓글모두삭제
    for(const comment of comments){
      await db.comments.destroy({ where: { commentid: comment.id } })
    }

    // 댓글모두삭제
    for(const comment of comments){
      await db.comments.destroy({ where: { id: comment.id } })
    }

    // post모두삭제
    for(const post of posts){
      await db.posts.destroy({ where: { postid: post.postid } })
    }

    // user삭제
    db.users.destroy({
      where: { nickname }
    })

    // 쿠키삭제
    res.clearCookie("access_token");
    res.clearCookie("login_nickName");

  } catch (error) {
    return res.status(400).send(error);
  }

  return res.send("success")
})

module.exports = router;