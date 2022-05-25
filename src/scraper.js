const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
const cheerio = require("cheerio");

let browser;

async function scrape(endpoint, page) {
    try {
        // Access browser page
        const response = await page.goto(endpoint, {
            waitUntil: "domcontentloaded",
        });

        const content = await page.content();
        const htmlString = await response.text();
        // console.log(htmlString);

        const $ = cheerio.load(content);

        const results = [];
        $(".listingCard--rentalCard").each((idx, rentalCard) => {
            const url = rentalCard.children[1].attribs.href;
            const description = rentalCard.children[3].children[0].data;
            results.push({ url, description });
        });

        // console.log(results.length);
        console.log("\x1b[37m", "Printing Rental Card:");
        console.log(results);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { scrape };
