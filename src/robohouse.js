const dotenv = require("dotenv");
const { generateSecureBrowsingEnvironment } = require("./browser");
const {
    scrapeStreeteasy,
    scrapeCorcoran,
    scrapeCompass,
} = require("./scraper");
const { batchCreateRentalsIfNotExists } = require("./utils");

const getTargets = () => {
    const streeteasyConfig = {
        name: "Streeteasy",
        url: process.env.STREETEASY_URL,
        scraper: scrapeStreeteasy,
        browsingConfig: {
            headless: true,
            proxyEnabled: true,
            interceptScripts: true,
        },
    };

    const corcoranConfig = {
        name: "Corcoran",
        url: process.env.CORCORAN_URL,
        scraper: scrapeCorcoran,
        browsingConfig: {
            headless: true,
            proxyEnabled: false,
            interceptScripts: false,
        },
    };

    return [streeteasyConfig, corcoranConfig];
};

module.exports = robohouse = async () => {
    try {
        let allNewListings = [];

        // Configure environment variables
        dotenv.config();

        const targets = getTargets();
        for (const { url, browsingConfig, scraper, name } of targets) {
            // Initialize chromium browsers
            console.log(`Creating ${name} Browsing Session with Puppeteer...`);

            const [page, browserSession] =
                await generateSecureBrowsingEnvironment(browsingConfig);

            // Get all listings on page
            const listings = await scraper(url, page);
            console.log(`Total ${name} listings found:`, listings.length);

            // Close page and browser session
            await page.close();
            await browserSession.close();
            console.log(`Closed ${name} Browsing Session`);

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

        return allNewListings;
    } catch (err) {
        throw err;
    } finally {
        console.log("Shut down Puppeteer browser...");
    }
};
