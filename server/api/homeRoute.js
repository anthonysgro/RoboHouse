const { Router } = require("express");
const axios = require("axios");
const path = require("path");

const homeRoute = Router();

homeRoute.get("/", async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = { homeRoute };
