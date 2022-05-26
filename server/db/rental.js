const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../db");

class Rental extends Model {
    // Instance Methods
}

Rental.init(
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        url: {
            type: DataTypes.STRING(2000),
            allowNull: false,
            unique: true,
            validate: {
                isUrl: true,
            },
        },
    },
    {
        timestamps: true,
        sequelize: db,
        modelName: "Rentals",
    },
);

module.exports = Rental;
