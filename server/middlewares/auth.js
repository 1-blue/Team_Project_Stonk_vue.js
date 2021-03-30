// const Op = require('sequelize').Op;
const { sequelize, users } = require('../models/index.js');

const driver = async () => {
    // Sequelize 초기화
    try {
        await sequelize.sync();
    } catch (err) {
        console.error(err);
        return;
    }
    console.log('초기화 완료.');
    // READ
    // const choices = await posts.findAll({ where: { id: 'id 001' } });
    // for (const quiz of choices) console.log(`${quiz.question} / ${quiz.answer}`);

    const user = await users.findAll({ where: { id: 'id 001' } });
    for (const row of user) console.log(`${row.nickname}`);
};
driver();