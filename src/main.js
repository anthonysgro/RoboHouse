const axios = require("axios");
const robohouse = require("./robohouse");
const {
    isRentalUrlUnique,
    sleep,
    batchCreateRentalsIfNotExists,
} = require("./utils");
const { Rental } = require("../server/db");
const postSlackMessage = require("./slack");
const MINUTES_TO_SLEEP = 10;

module.exports = main = async () => {
    try {
        while (true) {
            const newRentals = await robohouse();

            await postSlackMessage(newRentals);

            // Sleep for 10 minutes and ping again
            console.log(
                "\x1b[32m",
                `Sleeping for ${MINUTES_TO_SLEEP} minutes...\n`,
            );

            await sleep(60000 * MINUTES_TO_SLEEP);
        }
    } catch (err) {
        return err;
    }
};
