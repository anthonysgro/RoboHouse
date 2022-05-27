const axios = require("axios");
const robohouse = require("./robohouse");
const {
    isRentalUrlUnique,
    sleep,
    batchCreateRentalsIfNotExists,
} = require("./utils");
const { Rental } = require("../server/db");
const postSlackMessage = require("./slack");
const MILLISECONDS_PER_MINUTE = 60000;
const MINUTES_TO_SLEEP = 10;

module.exports = main = async () => {
    try {
        while (true) {
            const newRentals = await robohouse();

            // await postSlackMessage(newRentals);

            // Sleep for 10 minutes and ping again
            console.log(
                "\x1b[32m",
                `Sleeping for ${MINUTES_TO_SLEEP} ${
                    MINUTES_TO_SLEEP === 1 ? "minute" : "minutes"
                }...\n`,
            );

            await sleep(MILLISECONDS_PER_MINUTE * MINUTES_TO_SLEEP);
        }
    } catch (err) {
        return err;
    }
};
