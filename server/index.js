// Server setup
const path = require("path");
const http = require("http");
const dotenv = require("dotenv");
const express = require("express");
const { createTerminus } = require("@godaddy/terminus");
const morgan = require("morgan");

// Port, API, and DB imports
const PORT = process.env.PORT || 8888;
const { homeRoute, alertsRoute, robohouseRoute, testRoute } = require("./api");
const { Rental, seedDatabase } = require("./db");

// Code Imports
const main = require("../src/main");
const { onSignal, onHealthCheck } = require("./server-health");

async function initServer() {
    try {
        // Creates our server
        const app = express();

        // Initialize our environment variable configuration
        dotenv.config();

        // Middleware
        app.use(express.static(path.join(__dirname, "../public")));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(morgan("dev"));

        // Configure API endpoints
        app.use("/", homeRoute); // homepage
        app.use("/api/alerts", alertsRoute); // slack bot alerts
        app.use("/api/robohouse", robohouseRoute); // web scraper
        app.use("/api/test", testRoute); // test slack post while avoid scraping process

        // Error handling middleware
        app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.send(err.message || "Internal server error");
        });

        // Seed Database for testing purposes
        await seedDatabase();

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
