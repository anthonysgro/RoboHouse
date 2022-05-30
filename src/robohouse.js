const dotenv = require("dotenv");
const { generateSecureBrowsingEnvironment } = require("./browser");
const {
    scrapeStreeteasy,
    scrapeCorcoran,
    scrapeCompass,
} = require("./scraper");
const { batchCreateRentalsIfNotExists } = require("./utils");

// Scrape URL
const STREETEASY_URL =
    "https://streeteasy.com/for-rent/uws/price:-3100%7Cbeds:1-3";

const CORCORAN_URL =
    "https://www.corcoran.com/homes-for-rent/location/upper-west-side-ny-7662/regionId=1?bedMin=1&bedMax=1&priceMax=3100&sortBy=listedDate%2Bdesc";

const COMPASS_URL =
    "https://www.compass.com/for-rent/upper-west-side-manhattan-ny/price.max=3.1K/beds.min=1/dom.max=7days/sort=asc-dom/";

const streeteasyConfig = {
    name: "Streeteasy",
    url: STREETEASY_URL,
    scraper: scrapeStreeteasy,
    browsingConfig: {
        headless: true,
        proxyEnabled: true,
        interceptScripts: true,
    },
};

const corcoranConfig = {
    name: "Corcoran",
    url: CORCORAN_URL,
    scraper: scrapeCorcoran,
    browsingConfig: {
        headless: true,
        proxyEnabled: false,
        interceptScripts: false,
    },
};

const targets = [streeteasyConfig, corcoranConfig];

module.exports = robohouse = async () => {
    let sessions = [];
    let allNewListings = [];
    try {
        // Configure environment variables
        dotenv.config();

        // Initialize chromium browsers
        console.log("Launching Browser with Puppeteer...");

        for (const { url, browsingConfig, scraper, name } of targets) {
            [page, browserSession] = await generateSecureBrowsingEnvironment(
                browsingConfig,
            );

            // Get all listings on page
            const listings = await scraper(url, page);
            console.log(`Total ${name} listings found:`, listings.length);

            // Close page and browser session
            await page.close();
            await browserSession.close();

            // Dedupe listings
            const newListings = await batchCreateRentalsIfNotExists(listings);
            console.log(
                `Number of new ${name} listings stored to DB:`,
                newListings.length,
            );

            allNewListings = [...allNewListings, ...newListings];
        }

        console.log(
            "Number of new listings stored to DB:",
            allNewListings.length,
        );
    } catch (err) {
        throw err;
    } finally {
        console.log("Shut down Puppeteer browser...");

        return allNewListings;
    }
};
