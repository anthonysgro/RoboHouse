const { Router } = require("express");
const axios = require("axios");
const createSlackBlockJson = require("../../src/slack");

const testRoute = Router();

testRoute.get("/", async (req, res, next) => {
    try {
        await axios.post(
            process.env.SLACK_APP_WEBHOOK_URL,
            createSlackBlockJson({
                url: "https://streeteasy.com/building/309-west-84-street-new_york/5",
                description:
                    "Rental Unit in Upper West Side at 309 West 84th Street #5 for $2,850",
                primaryImage:
                    "https://photos.zillowstatic.com/fp/17d68ac86870cc20bd92e5174ace062c-se_medium_500_250.webp",
                price: "$3,195",
                neighborhood: "Rental Unit in Upper West Side",
                address: "82 West 105th Street #4I",
            }),
        );

        res.status(200).send("Successfully posted to Slack!");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = { testRoute };
