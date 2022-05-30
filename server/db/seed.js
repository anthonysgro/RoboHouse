const { Rental } = require("./rental");
const sequelize = require("./db");

const seedRentals = async () => {};

module.exports = seedDatabase = async () => {
    try {
        // await sequelize.sync({ force: true });
        console.log(`
            Database Connected
        `);

        // await seedRentals();
    } catch (err) {
        console.log("error seeding data:", err);
    }
};
