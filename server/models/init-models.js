var DataTypes = require("sequelize").DataTypes;
var _minimumPrices = require("./minimumPrices");

function initModels(sequelize) {
  var minimumPrices = _minimumPrices(sequelize, DataTypes);


  return {
    minimumPrices,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
