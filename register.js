const router = require('express').Router();
const db = require('../models/index');
const bcrypt = require('bcrypt');
const { nicknameOverlapCheck, idOverlapCheck } = require("../middlewares/middleware.js");

router.post('/', async function (req, res, next) {
  const { id, pw, passwordCheck, nickname, year, month, day, gender, phoneNumber1, phoneNumber2, phoneNumber3, quote, profileimage } = req.body;

  // 월, 일이 한자리일경우 맨앞에 0붙여줌
  let tempMonth = month;
  let tempDay = day;
  if(month < 10){
    tempMonth = `0${month}`
  }
  if(day < 10){
    tempDay = `0${day}`
  }
  const birth = `${year}-${tempMonth}-${tempDay}`
  const phonenumber = `${phoneNumber1}-${phoneNumber2}-${phoneNumber3}`

  // 패스워드중복체크
  if(pw !== passwordCheck){
    return res.redirect("http://localhost:8080/app.html#/pages/register?error=passwordError");
  }

  // id중복체크
  if(await idOverlapCheck(id)){
    return res.redirect("http://localhost:8080/app.html#/pages/register?error=idOverlap");
  }

  // nickname중복체크
  if(await nicknameOverlapCheck(nickname)){
    return res.redirect("http://localhost:8080/app.html#/pages/register?error=nicknameOverlap");
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
    quote,
    profileimage: "profileImage TEST"
  });

  return res.redirect("http://localhost:8080/app.html#/pages/main");
});

module.exports = router;