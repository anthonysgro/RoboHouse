const { addListener } = require("nodemon");
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("./db");

class Rental extends Model {
    // Instance Methods
}

Rental.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
        },
        url: {
            type: DataTypes.STRING(2000),
            allowNull: false,
            unique: true,
            validate: {
                isUrl: true,
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        primaryImage: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        neighborhood: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        beds: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        baths: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        site: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
    },
    {
        timestamps: true,
        sequelize,
        tableName: "rentals",
    },
);

module.exports = { Rental };
