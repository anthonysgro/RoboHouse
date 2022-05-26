const dotenv = require("dotenv");
const launchBrowser = require("./browser");
const generateSecurePage = require("./page");
const scrape = require("./scraper");

// Scrape URL
const URL =
    "https://streeteasy.com/1-bedroom-apartments-for-rent/uws/price:-3100";
const URL_TEST =
    "https://medium.com/recraftrelic/getting-started-with-puppeteerjs-f1f55a0ef7b9";
module.exports = robohouse = async () => {
    let page;
    let browser;

    try {
        // Configure environment variables
        dotenv.config();

        // Initialize chromium browser
        console.log("\x1b[32m", "Launching Browser with Puppeteer...\n");
        browser = await launchBrowser(true);
        page = await generateSecurePage(browser);

        // Scrape URL with page
        const results = await scrape(URL, page);

        return results;
    } catch (err) {
        return err;
    } finally {
        // Close session
        if (page !== null) await page.close();
        if (browser !== null) await browser.close();
    }
};
