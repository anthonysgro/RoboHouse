const { addListener } = require("nodemon");
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("./db");

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
                notEmpty: false,
            },
        },
        primaryImage: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
            validate: {
                notEmpty: false,
            },
        },
        neighborhood: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
            validate: {
                notEmpty: false,
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                notEmpty: false,
            },
        },
        price: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
            validate: {
                notEmpty: false,
            },
        },
        beds: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
            validate: {
                notEmpty: false,
            },
        },
        baths: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
            validate: {
                notEmpty: false,
            },
        },
        site: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            validate: {
                notEmpty: false,
            },
        },
    },
    {
        timestamps: true,
        sequelize,
        tableName: "rentals",
    },
);

module.exports = { Rental };
