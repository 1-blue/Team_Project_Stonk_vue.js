const jwt = require('jsonwebtoken');
const jwtDecode = require("jwt-decode");
const db = require('../models/index');
require('dotenv').config();

// 로그인체크미들웨어
exports.isLoggedIn = (req, res, next) => {
  // 토큰가져와서
  try{
    const token = req.headers.cookie.split("=")[1];   //쿠키파서로 파싱하게만들기

    // 분석
    const checkToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
  
    if(checkToken){
      const decoded = jwtDecode(token);
      req.userId = decoded.id;  // 로그인한 유저를 구분하는데 사용
      next();
    } else {
      res.send("정상적이지 않은 회원입니다.")
    }
  } catch(error) {
    res.send(`로그인후에 시도해주세요, ${error}`);
  }

};

// 닉네임중복체크 : 중복시 true반환
exports.nicknameOverlapCheck = async (nickname) => {
    const exUserNick = await db.users.findOne({ where: { nickname } });
    if (exUserNick) {
        return true;
    }
    return false;
}

// 아이디 중복 체크
exports.idOverlapCheck = async (id) => {
    const exUserEmail = await db.users.findOne({ where: { id } });
    if (exUserEmail) {
        return true;
    }
    return false;
}