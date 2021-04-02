const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const bcrypt = require('bcrypt');

require('dotenv').config({ path: __dirname+"/../.env" });
//{path:""}
router.post('/', async function (req, res) {
  const {id, pw} = req.body;

  let currentUser = await db.users.findOne({ where: { id } });
  if(currentUser){
    if(await bcrypt.compare(pw, currentUser.pw)){
      // 쿠키등록
      const token = jwt.sign(
        {
          nickname: currentUser.nickname,
          id: currentUser.id,
        },
        process.env.JWT_SECRET_KEY,
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