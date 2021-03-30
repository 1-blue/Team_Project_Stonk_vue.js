const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    memoid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parentpostid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'posts',
        key: 'postid'
      }
    },
    id: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    contents: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    createddate: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'comments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "memos_pkey",
        unique: true,
        fields: [
          { name: "parentpostid" },
        ]
      },
    ]
  });
};
