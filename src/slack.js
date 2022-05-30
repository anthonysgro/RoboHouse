const axios = require("axios");

const createSlackBlockJson = ({
    address,
    price,
    description,
    primaryImage,
    url,
    neighborhood,
    site,
    beds,
    baths,
}) => {
    return {
        blocks: [
            {
                type: "section",
                text: {
                    type: "plain_text",
                    emoji: true,
                    text: `There is a new ${site} Listing!`,
                },
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*<${url}|${address || "No Address Listed"}>*\n${
                        neighborhood || "No Neighborhood Listed"
                    }\n${price || "----"} per month\n${beds || ""} • ${
                        baths || ""
                    }`,
                },
                accessory: {
                    type: "image",
                    image_url: primaryImage,
                    alt_text: "image thumbnail",
                },
            },
            {
                type: "divider",
            },
        ],
    };
};

module.exports = postSlackMessage = async (newRentals) => {
    try {
        if (newRentals.length > 0) {
            for (const rental of newRentals) {
                await axios.post(
                    process.env.APP_ENV === "prod"
                        ? process.env.SLACK_APP_WEBHOOK_URL
                        : process.env.SLACK_APP_WEBHOOK_URL_DEV,
                    createSlackBlockJson(rental),
                );
                console.log("Posted listing to slack channel:", rental.address);
            }
        } else {
            console.log("Nothing to post to slack channel");
        }
    } catch (err) {
        console.error(err);
        return err;
    }
};
