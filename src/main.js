const dotenv = require("dotenv");
const launchBrowser = require("./browser");
const configureHeadlessBrowsing = require("./page");
const { scrape } = require("./scraper");

// Scrape URL
const URL =
    "https://streeteasy.com/1-bedroom-apartments-for-rent/uws/price:-3100";

async function main() {
    // Configure environment variables
    dotenv.config();

    // Initialize chromium browser
    console.log("\x1b[32m", "Launching Browser with Puppeteer...\n");
    const browser = await launchBrowser(true);
    const page = await configureHeadlessBrowsing(browser);

    // Scrape URL with page
    await scrape(URL, page);
}

main();
