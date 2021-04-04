const router = require('express').Router();
const db = require('../models/index');

// 유저 세부내용 전달
router.get('/:nickname', async function (req, res, next) {
  const { nickname } = req.params;

  const data = await db.users.findOne({ where: { nickname } })
  
  return res.send(data);
});

module.exports = router;