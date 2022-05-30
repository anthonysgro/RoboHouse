const subscribers = [
    process.env.TWILIO_MY_PHONE_NUMBER,
    process.env.TWILIO_FRIEND_PHONE_NUMBER,
];

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
        for (let i = 0; i < subscribers.length; i++) {
            for (const { site, url, address } of newRentals) {
                sendText(
                    subscribers[i],
                    process.env.TWILIO_ACCOUNT_PHONE_NUMBER,
                    `There is a new ${site} Listing!\n${url}`,
                );
            }
        }
    } else {
        console.log("Nothing to text");
    }
};
