const { Router } = require("express");

const alertsRoute = Router();

alertsRoute.get("/", async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    }
});

module.exports = { alertsRoute };
