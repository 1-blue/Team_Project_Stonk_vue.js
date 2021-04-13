const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  let posts = sequelize.define('posts', {
    postid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    datetime: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'posts',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "posts_pkey",
        unique: true,
        fields: [
          { name: "postid" },
        ]
      },
    ]
  });

  posts.associate = (models) => {
    posts.belongsTo(models.users, { foreignKey: "id", targetKey: "id" });

    posts.hasMany(models.comments, { foreignKey: "postid", targetKey: "id" });
  }

  return posts;
};
