const router = require('express').Router();
const db = require('../models/index');

router.post('/', async function (req, res, next) {
  const {id, pw, passwordCheck, nickname, year, month, day, gender, phoneNumber1, phoneNumber2, phoneNumber3, quote} = req.body;
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

  // 회원가입에 들어갈데이터 테스트출력용
  // console.log(
  //   `
  //   id : ${id}
  //   pw : ${pw}
  //   nickname : ${nickname}
  //   birth : ${birth}
  //   gender : ${(gender === "male" ? "T" : "F")}
  //   phoneNumber : ${phonenumber}
  //   quote : ${quote}
  //   `
  // );

  // 패스워드중복체크
  if(pw !== passwordCheck){
    return res.redirect("http://localhost:8080/app.html#/pages/register?error=passwordError");
  }

  // id중복체크
  let overlapCheck = await db.users.findOne({ where: { id } });
  if(overlapCheck){
    return res.redirect("http://localhost:8080/app.html#/pages/register?error=idOverlap");
  }

  // nickname중복체크
  overlapCheck = "";
  overlapCheck = await db.users.findOne({ where: { nickname } })
  if(overlapCheck){
    return res.redirect("http://localhost:8080/app.html#/pages/register?error=nicknameOverlap");
  }

  db.users.create({
    id,
    pw,
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