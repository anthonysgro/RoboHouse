const sendText = async (to, from, body) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
    const client = require("twilio")(accountSid, authToken);

    try {
        const message = await client.messages.create({
            body,
            from,
            to,
        });

        console.log(`Message sent with Twilio:\n${message.sid}`);
    } catch (err) {
        throw err;
    }
};

module.exports = emitNewListingsViaText = async (newListings) => {
    try {
        const isProd = process.env.APP_ENV === "prod";
        const dev_subscribers =
            process.env.TWILIO_ACCOUNT_DEV_PHONE_NUMBERS.split(",");
        const prod_subscribers =
            process.env.TWILIO_ACCOUNT_PROD_PHONE_NUMBERS.split(",");

        if (newListings.length > 0) {
            const subscribers = isProd ? prod_subscribers : dev_subscribers;
            for (let i = 0; i < subscribers.length; i++) {
                for (const { site, url, address } of newListings) {
                    await sendText(
                        subscribers[i],
                        process.env.TWILIO_ACCOUNT_SOURCE_PHONE_NUMBER,
                        `There is a new ${site} Listing!\n${url}`,
                    );
                }
            }
        } else {
            console.log("Nothing to text");
        }
    } catch (err) {
        throw err;
    }
};
