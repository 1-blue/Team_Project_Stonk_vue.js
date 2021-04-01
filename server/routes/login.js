const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../models/index');
require('dotenv').config();

router.post('/', async function (req, res, next) {
  const {id, pw} = req.body;

  let currentUser = await db.users.findOne({ where: { id } });

  if(currentUser){
    if(currentUser.pw === pw){
      // 쿠키등록
      const token = jwt.sign(
        {
          nickname: currentUser.nickname,
        },
        process.env.JWT_SECRET_EKY,
        {
          algorithm : "HS256", // 해싱 알고리즘
          expiresIn : "60m",  // 토큰 유효 기간
          issuer : "stonk" // 발행자
        }
      )
      res.cookie("access_token", token, { httpOnly: false })    // httponly수정필요.. 일단이렇게 안하면 vue에서 쿠기를 못읽음

      return res.redirect('http://localhost:8080/app.html#/pages/main');
    }
  }

  return res.redirect("http://localhost:8080/app.html#/pages/main?state=fail");
});

module.exports = router;