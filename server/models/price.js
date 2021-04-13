const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('price', {
        priceindex: {
            autoIncrement: true,
            autoIncrementIdentity: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        adddate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        itemtype: {
            type: DataTypes.CHAR(10),
            allowNull: false
        },
        itemprice: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'price',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "price_pkey",
                unique: true,
                fields: [
                    { name: "priceindex" },
                ]
            },
        ]
    });
};