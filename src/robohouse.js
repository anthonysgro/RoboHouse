const dotenv = require("dotenv");
const launchBrowser = require("./browser");
const generateSecurePage = require("./page");
const scrapeFirstPage = require("./scraper");
const { batchCreateRentalsIfNotExists } = require("./utils");

// Scrape URL
const URL =
    "https://streeteasy.com/1-bedroom-apartments-for-rent/uws/price:-3100";
const URL_TEST =
    "https://medium.com/recraftrelic/getting-started-with-puppeteerjs-f1f55a0ef7b9";

module.exports = robohouse = async () => {
    let page;
    let browser;
    let newRentals;

    try {
        // Configure environment variables
        dotenv.config();

        // Initialize chromium browser
        console.log("\x1b[32m", "Launching Browser with Puppeteer...\n");
        browser = await launchBrowser(true);
        page = await generateSecurePage(browser);

        // Scrape URL with page
        const results = await scrapeFirstPage(URL, page);

        console.log("\x1b[32m", "Total listings found:", results.length);

        newRentals = await batchCreateRentalsIfNotExists(results);
        console.log(
            "\x1b[32m",
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
        console.log("\x1b[32m", "Shut down Puppeteer browser...\n");

        return newRentals;
    }
};
