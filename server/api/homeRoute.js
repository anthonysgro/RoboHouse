const { Router } = require("express");

const homeRoute = Router();

homeRoute.get("/", async (req, res, next) => {
    try {
        res.status(200).send(
            "Welcome to RoboHouse! Use the /api/robohouse endpoint to trigger continuous searching",
        );
    } catch (err) {
        next(err);
    }
});

module.exports = { homeRoute };
