const db = require("./db");
const { Rental } = require("./rental");
const seedDatabase = require("./seed");

module.exports = {
    db,
    Rental,
    seedDatabase,
};
