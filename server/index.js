// Server setup
const path = require("path");
const http = require("http");
const morgan = require("morgan");
const dotenv = require("dotenv");
const express = require("express");
const PORT = process.env.PORT || 8888;
const main = require("../src/main");

const { createTerminus } = require("@godaddy/terminus");
const { onSignal, onHealthCheck } = require("./server-health");
const { Rental, seedDatabase } = require("./db");

async function initServer() {
    try {
        // Creates our server
        const app = express();

        // Initialize our environment variable configuration
        dotenv.config();

        // Middleware
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // Middleware Logging
        app.use(morgan("dev"));

        // Setup main api route
        app.get("/", async (req, res, next) => {
            try {
                res.status(200).send(
                    "Welcome to RoboHouse! Use the /robohouse endpoint to trigger continuous searching",
                );
            } catch (err) {
                next(err);
            }
        });

        // RoboHouse
        app.get("/robohouse", async (req, res, next) => {
            try {
                res.sendStatus(200);

                // -------------------------------------------------------------------
                // | This is where all the code is that you're probably interested in |
                // -------------------------------------------------------------------
                await main();
            } catch (err) {
                next(err);
            }
        });

        // Error handling middleware
        app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.send(err.message || "Internal server error");
        });

        // Seed Database for testing purposes
        // await seedDatabase();

        // Create http server with app
        const server = http.createServer(app);

        // Server health check/shutdown sequence
        createTerminus(server, {
            signals: ["SIGINT", "SIGTERM"],
            healthChecks: { "/healthcheck": onHealthCheck },
            onSignal,
            timeout: 1000,
        });

        // Set server to listen to port number
        server.listen(PORT, () =>
            console.log(`
            Listening on Port ${PORT}
            http://localhost:${PORT}
            `),
        );
    } catch (err) {
        console.error(err);
    }
}

initServer();
