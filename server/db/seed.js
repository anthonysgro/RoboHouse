const { Rental } = require("./rental");
const sequelize = require("./db");

const seedRentals = async () => {
    // const rental1 = {
    //     url: "https://streeteasy.com/building/308-west-109-street-new_york/8",
    //     description:
    //         "Rental Unit in Upper West Side at 308 West 109th Street #8 for $2,400",
    // };
    // await Rental.create(rental1);
};

module.exports = seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log(`
            Database Connected
        `);

        // await seedRentals();
    } catch (err) {
        console.log("error seeding data:", err);
    }
};
