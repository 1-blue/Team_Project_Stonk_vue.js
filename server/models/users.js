const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  let users = sequelize.define('users', {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
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
      type: DataTypes.STRING(15),
      allowNull: false
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    phonenumber: {
      type: DataTypes.STRING(20),
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

  users.associate = (models) => {
    users.hasMany(models.posts, { foreignKey: "id", targetKey: "id" });
  }

  return users;
  // return sequelize.define('users', {
  //   userid: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //     autoIncrement: true
  //   },
  //   id: {
  //     type: DataTypes.STRING(20),
  //     allowNull: false,
  //     primaryKey: true
  //   },
  //   pw: {
  //     type: DataTypes.STRING(100),
  //     allowNull: false
  //   },
  //   nickname: {
  //     type: DataTypes.STRING(15),
  //     allowNull: false
  //   },
  //   birth: {
  //     type: DataTypes.STRING(15),
  //     allowNull: false
  //   },
  //   gender: {
  //     type: DataTypes.CHAR(1),
  //     allowNull: false
  //   },
  //   phonenumber: {
  //     type: DataTypes.STRING(20),
  //     allowNull: true
  //   },
  //   quote: {
  //     type: DataTypes.STRING(100),
  //     allowNull: true
  //   },
  //   profileimage: {
  //     type: DataTypes.TEXT,
  //     allowNull: true
  //   }
  // }, {
  //   sequelize,
  //   tableName: 'users',
  //   schema: 'public',
  //   timestamps: true,
  //   indexes: [
  //     {
  //       name: "users_pkey",
  //       unique: true,
  //       fields: [
  //         { name: "id" },
  //       ]
  //     },
  //   ]
  // });
};
