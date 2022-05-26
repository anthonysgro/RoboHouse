const robohouse = require("./robohouse");
const {
    isRentalUrlUnique,
    sleep,
    batchCreateRentalsIfNotExists,
} = require("./utils");
const { Rental } = require("../server/db");
const MILLISECONDS_PER_MINUTE = 60000;
const MINUTES_TO_SLEEP = 10;

module.exports = main = async () => {
    try {
        while (true) {
            const rentals = await robohouse();
            console.log("\x1b[32m", "Total listings found:", rentals.length);

            const newRentals = await batchCreateRentalsIfNotExists(rentals);
            console.log(
                "\x1b[32m",
                "Number of new listings stored to DB:",
                newRentals.length,
                "\n",
            );

            // Sleep for 10 minutes and ping again
            const plural = MINUTES_TO_SLEEP === 1 ? "minute" : "minutes";
            console.log(
                "\x1b[32m",
                `Sleeping for ${MINUTES_TO_SLEEP} ${plural}...\n`,
            );

            await sleep(MILLISECONDS_PER_MINUTE * MINUTES_TO_SLEEP);
        }
    } catch (err) {
        return err;
    }
};
