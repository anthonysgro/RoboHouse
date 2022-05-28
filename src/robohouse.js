const dotenv = require("dotenv");
const launchBrowser = require("./browser");
const generateSecurePage = require("./page");
const { scrapeStreeteasy } = require("./scraper");
const { batchCreateRentalsIfNotExists } = require("./utils");

// Scrape URL
const STREETEASY_URL =
    "https://streeteasy.com/1-bedroom-apartments-for-rent/uws/price:-3100";

module.exports = robohouse = async () => {
    let page;
    let browser;
    let newRentals;

    try {
        // Configure environment variables
        dotenv.config();

        // Initialize chromium browser
        console.log("Launching Browser with Puppeteer...\n");
        browser = await launchBrowser(true);
        page = await generateSecurePage(browser);

        // Scrape streeteasy with page
        const results = await scrapeStreeteasy(STREETEASY_URL, page);

        console.log("Total listings found:", results.length);

        newRentals = await batchCreateRentalsIfNotExists(results);
        console.log(
            "Number of new listings stored to DB:",
            newRentals.length,
            "\n",
        );
    } catch (err) {
        console.error(err);
        return err;
    } finally {
        // Close session
        if (page !== null) await page.close();
        if (browser !== null) await browser.close();
        console.log("Shut down Puppeteer browser...\n");

        return newRentals;
    }
};
