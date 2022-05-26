const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const cheerio = require("cheerio");

let browser;

module.exports = scrape = async (endpoint, page) => {
    try {
        // Access browser page
        const response = await page.goto(endpoint, {
            waitUntil: "domcontentloaded",
        });

        const content = await page.content();

        // Uncomment to view raw HTML
        // const htmlString = await response.text();
        // console.log(htmlString);

        const $ = cheerio.load(content);

        const results = [];
        $(".listingCard--rentalCard").each((idx, rentalCard) => {
            const url = rentalCard.children[1].attribs.href;
            const description = rentalCard.children[3].children[0].data;
            results.push({ url, description });
        });

        return results;
    } catch (err) {
        console.log(err);
    }
};
