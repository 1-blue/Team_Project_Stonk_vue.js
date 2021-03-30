module.exports = {
    HOST: "203.232.193.172",
    PORT: "5051",
    USER: "jeoungwoo",
    PASSWORD: "jeoungwooTestPw123",
    DB: "stardewClone",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};