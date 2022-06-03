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

module.exports = main = async () => {
    try {
        while (true) {
            console.log("********* Initiating Search *********");

            // Get Listings
            const newRentals = await robohouse();

            // Emit Listings
            if (process.env.SLACK_NOTIFICATIONS_ENABLED === "true") {
                // await postSlackMessage(newRentals);
            }

            if (process.env.TEXT_NOTIFICATIONS_ENABLED === "true") {
                // await emitNewListingsViaText(newRentals);
            }

            // Sleep for 10 minutes and ping again
            console.log(
                `Sleeping for ${process.env.APP_FREQUENCY_MINUTES} minutes...\n`,
            );
            await sleep(60000 * parseInt(process.env.APP_FREQUENCY_MINUTES));
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};
