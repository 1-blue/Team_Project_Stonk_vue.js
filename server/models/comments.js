const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const comments = sequelize.define('comments', {
    comment: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    datetime: {
      type: Sequelize.STRING(30),
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'comments',
    schema: 'public',
    timestamps: true,
    // indexes: [
    //   {
    //     name: "posts_pkey",
    //     unique: true,
    //     fields: [
    //       { name: "postid" },
    //     ]
    //   },
    // ]
  });

  comments.associate = (models) => {
    comments.belongsTo(models.users, { foreignKey: "userid", targetKey: "id" });

    comments.belongsTo(models.posts, { foreignKey: "postid", targetKey: "id" });

    comments.hasMany(models.comments, { foreignKey: "commentid", targetKey: "id" });
  }

  return comments;
};
