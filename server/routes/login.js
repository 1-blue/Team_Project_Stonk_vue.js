const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../models/index');
require('dotenv').config({ path: __dirname+"/../.env" });
//{path:""}
router.post('/', async function (req, res) {
  const {id, pw} = req.body;

  let currentUser = await db.users.findOne({ where: { id } });

  if(currentUser){
    if(currentUser.pw === pw){
      console.log("login success")
      console.log(__dirname + "../.env")
      console.log(process.env.JWT_SECRET_KEY)
      // 쿠키등록
      const token = jwt.sign(
        {
          nickname: currentUser.nickname,
        },
        process.env.JWT_SECRET_KEY,
        {
          algorithm : "HS256", // 해싱 알고리즘
          expiresIn : "60m",  // 토큰 유효 기간
          issuer : "stonk" // 발행자
        }
      )
      console.log(token)
      res.cookie("access_token", token, { httpOnly: true })    // httponly수정필요.. 일단이렇게 안하면 vue에서 쿠기를 못읽음

      return res.redirect('http://localhost:8080/app.html#/pages/main');
    }
  }

  return res.redirect("http://localhost:8080/app.html#/pages/main?state=fail");
});

module.exports = router;