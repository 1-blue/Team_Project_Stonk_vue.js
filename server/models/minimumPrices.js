const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('minimumPrices', {
    idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    itemCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    minimumPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'minimumPrices',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "minimumPrices_pkey",
        unique: true,
        fields: [
          { name: "idx" },
        ]
      },
    ]
  });
};
