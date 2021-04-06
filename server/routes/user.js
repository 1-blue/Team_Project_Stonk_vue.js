const router = require('express').Router();
const db = require('../models/index');
const bcrypt = require('bcrypt');

// 유저 세부내용 전달
router.get('/:nickname', async function (req, res) {
  const { nickname } = req.params;

  const data = await db.users.findOne({ where: { nickname } })

  return res.send(data);
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
    return res.redirect(`http://localhost:8080/app.html#/user/update/password/${nickname}`);
  }
  
  return res.redirect(`http://localhost:8080/app.html#/user/update/password/${nickname}?error=passwordDiscord`)
});

// 패스워드변경... form은 get/post말고 다른거 전달하는방법있나..
router.post('/password/update/:nickname', async function (req, res) {
  const { password, passwordCheck } = req.body;
  const { nickname } = req.params;

  if(password !== passwordCheck){
    return res.redirect(`http://localhost:8080/app.html#/user/update/password/${nickname}?error=notEqual`);
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

  return res.redirect(`http://localhost:8080/app.html#/pages/main?state=passwordChangeSuccess`);
});

// 유저정보수정
router.post('/', async (req, res) => {
  const { userid, id, nickname, year, month, day, gender, phoneNumber1, phoneNumber2, phoneNumber3, quote, profileimage } = req.body;

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
      id,
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

  res.redirect(`http://localhost:8080/app.html#/user/${nickname}`);
})

module.exports = router;