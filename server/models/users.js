const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    pw: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    birth: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    phonenumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quote: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    profileimage: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
