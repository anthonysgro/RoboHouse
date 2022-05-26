const db = require("./db");
const Rental = require("./rental");

module.exports = {
    db,
    model: {
        Rental,
    },
};
