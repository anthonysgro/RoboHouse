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

module.exports = robohouse = async () => {
    let streeteasyPage;
    let streeteasyBrowser;
    let corcoranPage;
    let corcoranBrowser;
    let newStreeteasyRentals = [];
    let newCorcoranRentals;

    try {
        // Configure environment variables
        dotenv.config();

        // Initialize chromium browsers
        console.log("Launching Browser with Puppeteer...");
        [streeteasyPage, streeteasyBrowser] =
            await generateSecureBrowsingEnvironment({
                headless: true,
                proxyEnabled: true,
                interceptScripts: true,
            });

        [corcoranPage, corcoranBrowser] =
            await generateSecureBrowsingEnvironment({
                headless: true,
                proxyEnabled: false,
                interceptScripts: false,
            });

        const streeteasy = await scrapeStreeteasy(
            STREETEASY_URL,
            streeteasyPage,
        );
        const corcoran = await scrapeCorcoran(CORCORAN_URL, corcoranPage);
        // const compass = await scrapeCompass(COMPASS_URL, page);

        console.log("Total Streeteasy listings found:", streeteasy.length);
        console.log("Total Corcoran Listings Found:", corcoran.length);

        newStreeteasyRentals = await batchCreateRentalsIfNotExists(streeteasy);
        newCorcoranRentals = await batchCreateRentalsIfNotExists(corcoran);

        console.log(
            "Number of new Streeteasy listings stored to DB:",
            newStreeteasyRentals.length,
        );

        console.log(
            "Number of new Corcoran listings stored to DB:",
            newCorcoranRentals.length,
        );
    } catch (err) {
        throw err;
    } finally {
        // Close session
        if (corcoranPage !== null) await corcoranPage.close();
        if (streeteasyPage !== null) await streeteasyPage.close();
        if (corcoranBrowser !== null) await corcoranBrowser.close();
        if (streeteasyBrowser !== null) await streeteasyBrowser.close();

        console.log("Shut down Puppeteer browser...");

        return [...newStreeteasyRentals, ...newCorcoranRentals];
    }
};
