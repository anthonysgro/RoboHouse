// Server setup
const path = require("path");
const http = require("http");
const morgan = require("morgan");
const dotenv = require("dotenv");
const express = require("express");
const PORT = process.env.PORT || 8888;
const main = require("../src/main");
const sleep = require("../src/sleep");

const { createTerminus } = require("@godaddy/terminus");
const { onSignal, onHealthCheck } = require("./server-health");
// const { model, seedDatabase } = require("./db");
// const { User } = model;

async function initServer() {
    try {
        // Creates our server
        const app = express();

        // Initialize our environment variable configuration
        dotenv.config();

        // Middleware
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.static(path.join(__dirname, "../public")));

        // Middleware Logging
        app.use(morgan("dev"));

        // Setup main api route
        app.get("/", async (req, res, next) => {
            try {
                const rentals = await main();
                rentals.forEach((rental) => {
                    console.log(rental);
                });
            } catch (err) {
                next(err);
            }
            res.send("Hello, world!");
        });

        // Error handling middleware
        app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.send(err.message || "Internal server error");
        });

        // Seed Database
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
