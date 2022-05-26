const { Router } = require("express");
const axios = require("axios");
const createSlackBlockJson = require("../../src/block");

const homeRoute = Router();

homeRoute.get("/", async (req, res, next) => {
    try {
        res.status(200).send(
            "Welcome to RoboHouse! Use the /api/robohouse endpoint to trigger continuous searching",
        );
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = { homeRoute };
