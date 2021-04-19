const router = require('express').Router();
const db = require('../models/index');
const bcrypt = require('bcrypt');

// 유저정보수정
router.post('/', async (req, res) => {
  const { userid, previousNickname, nickname, year, month, day, gender, phoneNumber1, phoneNumber2, phoneNumber3, quote, profileimage } = req.body;

  // 닉네임중복검사
  if(previousNickname !== nickname){
    const exUserNick = await db.users.findOne({ where: { nickname } });
    if (exUserNick) {
      return res.redirect(`/app.html#/user/update/${previousNickname}?error=nicknameOverlap`);
    }
  }

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

  await db.users.update(
    {
      nickname,
      birth,
      gender: (gender === "male" ? "T" : "F"),
      phonenumber,
      quote
    },
    {
      where: { userid },
    }
  );

  // niackname쿠키 변경
  res.cookie("login_nickName", nickname, { httpOnly: false })

  res.redirect(`/app.html#/user/${nickname}`);
})

// 유저 세부내용 전달
router.get('/:nickname', async function (req, res) {
  const { nickname } = req.params;

  const data = await db.users.findOne({ where: { nickname } })
  
  // 존재하지않는유저를 찾는경우
  if(!data){
    return res.status(500).send("Not Found User");
  }

  return res.json(data);
});

// 패스워드체크
router.post('/password/:nickname', async function (req, res) {
  const { password } = req.body;
  const { nickname } = req.params;

  const user = await db.users.findOne({
    where: { nickname },
    attributes: ['pw'],
  });


  if(await bcrypt.compare(password, user.pw)){
    // 패스워드인증성공시 쿠키전송  페이지 변환할때 사용 (한번쓰고바로삭제)
    res.cookie("password_update", "stonk", { httpOnly: false })
    return res.redirect(`/app.html#/user/update/password/${nickname}`);
  }
  
  return res.redirect(`/app.html#/user/update/password/${nickname}?error=passwordDiscord`)
});

// 패스워드변경... form은 get/post말고 다른거 전달하는방법있나..
router.post('/password/update/:nickname', async function (req, res) {
  const { password, passwordCheck } = req.body;
  const { nickname } = req.params;

  if(password !== passwordCheck){
    return res.redirect(`/app.html#/user/update/password/${nickname}?error=notEqual`);
  }

  const hash = await bcrypt.hash(password, 5);

  db.users.update(
    {
      pw: hash
    },
    {
      where: { nickname }
    }
  )
  
  res.clearCookie("password_update");
  res.clearCookie("access_token");
  res.clearCookie("login_nickName");

  return res.redirect(`/app.html#/home?state=passwordChangeSuccess`);
});

module.exports = router;