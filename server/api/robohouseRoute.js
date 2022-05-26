const { Router } = require("express");
const main = require("../../src/main");

const robohouseRoute = Router();

robohouseRoute.get("/", async (req, res, next) => {
    try {
        res.sendStatus(200);

        // -------------------------------------------------------------------
        // | This is where all the code is that you're probably interested in |
        // -------------------------------------------------------------------
        await main();
    } catch (error) {
        next(error);
    }
});

module.exports = { robohouseRoute };
