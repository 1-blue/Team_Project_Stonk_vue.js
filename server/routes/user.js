const router = require('express').Router();
const db = require('../models/index');

// 유저 세부내용 전달
router.get('/:id', async function (req, res, next) {
  const { id } = req.params;

  const data = await db.users.findOne({ where: { id } })

  console.log(data);
  
  return res.send(data);
});

module.exports = router;