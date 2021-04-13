const jwt = require('jsonwebtoken');
const jwtDecode = require("jwt-decode");
const db = require('../models/index');
require('dotenv').config();

// 로그인한 유저아이디 가져오기
exports.getUserId = (req, res) => {
  try {
    const { access_token } = req.cookies;
    const checkToken = jwt.verify(access_token, process.env.JWT_SECRET_KEY)

    if (checkToken) {
      const decoded = jwtDecode(access_token);
      return decoded.id;
    } else {
      res.send("정상적이지 않은 회원입니다.")
    }
  } catch (error) {
    res.send(`로그인후에 시도해주세요, ${error}`);
  }
};

// 로그인체크미들웨어
exports.isLoggedIn = (req, res, next) => {
  // 토큰가져와서
  try {
    const { access_token } = req.cookies;

    // 분석
    const checkToken = jwt.verify(access_token, process.env.JWT_SECRET_KEY)

    if (checkToken) {
      const decoded = jwtDecode(access_token);
      req.userId = decoded.id;  // 로그인한 유저를 구분하는데 사용
      next();
    } else {
      res.send("정상적이지 않은 회원입니다.")
    }
  } catch (error) {
    res.send(`로그인후에 시도해주세요, ${error}`);
  }

};

// 회원가입시 닉네임중복체크 : 중복시 true반환
exports.nicknameOverlapCheck = async (req, res, next) => {
  const { nickname } = req.body;

  const exUserNick = await db.users.findOne({ where: { nickname } });
  if (exUserNick) {
    return res.redirect("http://localhost:8080/app.html#/register?error=nicknameOverlap");
  }
  return next();
}

// 아이디 중복 체크
exports.idOverlapCheck = async (req, res, next) => {
  const { id } = req.body;
  const exUserEmail = await db.users.findOne({ where: { id } });
  if (exUserEmail) {
    return res.redirect("http://localhost:8080/app.html#/register?error=idOverlap");
  }
  return next();
}