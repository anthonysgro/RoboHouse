const { Router } = require("express");

const robohouseRoute = Router();

robohouseRoute.get("/", async (req, res, next) => {
    try {
        // -------------------------------------------------------------------
        // | This is where all the code is that you're probably interested in |
        // -------------------------------------------------------------------
        await main();
    } catch (error) {
        next(error);
    }
});

module.exports = { robohouseRoute };
