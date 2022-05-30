const db = require("./db");
const { Rental } = require("./rental");
const forceSyncDB = require("./seed");

module.exports = {
    db,
    Rental,
    forceSyncDB,
};
