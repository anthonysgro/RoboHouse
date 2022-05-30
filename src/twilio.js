const sendText = (to, from, body) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_ACCOUNT_TOKEN;

    const client = require("twilio")(accountSid, authToken);

    console.log("About to send message");
    client.messages
        .create({
            body,
            from,
            to,
        })
        .then((message) =>
            console.log(`Message sent with Twilio:\n${message.sid}`),
        )
        .catch((err) => console.error(err));
};

module.exports = emitNewListingsViaText = (newListings) => {
    if (newListings.length > 0 && process.env.APP_ENV === "prod") {
        for (const { site, url, address } of newRentals) {
            sendText(
                process.env.MY_PHONE_NUMBER,
                process.env.TWILIO_ACCOUNT_PHONE_NUMBER,
                `There is a new ${site} Listing!\n${url}`,
            );

            sendText(
                process.env.FRIEND_PHONE_NUMBER,
                process.env.TWILIO_ACCOUNT_PHONE_NUMBER,
                `There is a new ${site} Listing!\n${url}`,
            );

            console.log("Texted Listing to Subscribers:", address);
        }
    } else {
        console.log("Nothing to text.");
    }
};
