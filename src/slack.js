const axios = require("axios");

const createSlackBlockJson = ({
    address,
    price,
    description,
    primaryImage,
    url,
    neighborhood,
    site,
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
                    text: `*<${url}|${address}>*\n${neighborhood}\n${price} per month`,
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
                    process.env.SLACK_APP_WEBHOOK_URL,
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
