const dotenv = require("dotenv");
const launchBrowser = require("./browser");
const generateSecurePage = require("./page");
const scrape = require("./scraper");
const sleep = require("./sleep");

// Scrape URL
const URL =
    "https://streeteasy.com/1-bedroom-apartments-for-rent/uws/price:-3100";

module.exports = main = async () => {
    // Configure environment variables
    dotenv.config();

    // Initialize chromium browser
    console.log("\x1b[32m", "Launching Browser with Puppeteer...\n");
    const browser = await launchBrowser(true);
    const page = await generateSecurePage(browser);

    // Scrape URL with page
    const results = await scrape(URL, page);

    console.log("\x1b[37m", "Printing Results:");
    console.log(results);

    // Close session
    await page.close();
    await browser.close();

    return results;
};
