const axios = require("axios");
const robohouse = require("./robohouse");
const {
    isRentalUrlUnique,
    sleep,
    batchCreateRentalsIfNotExists,
} = require("./utils");
const { Rental } = require("../server/db");
const postSlackMessage = require("./slack");
const emitNewListingsViaText = require("./twilio");
const MINUTES_TO_SLEEP = 20;

module.exports = main = async () => {
    try {
        while (true) {
            console.log("********** Initiating Search **********");

            // Get Listings
            const newRentals = await robohouse();

            // Emit Listings
            await postSlackMessage(newRentals);
            await emitNewListingsViaText(newRentals);

            // Sleep for 10 minutes and ping again
            console.log(`Sleeping for ${MINUTES_TO_SLEEP} minutes...\n`);
            await sleep(60000 * MINUTES_TO_SLEEP);
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};
