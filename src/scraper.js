const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const cheerio = require("cheerio");
const { _attributes } = require("../server/db/db");

let browser;

module.exports = scrape = async (endpoint, page) => {
    try {
        console.log("\x1b[32m", "Navigating to requested page...\n");

        // Access browser page
        const response = await page.goto(endpoint, {
            waitUntil: "domcontentloaded",
        });

        const content = await page.content();
        const $ = cheerio.load(content);

        const results = [];
        $(".listingCard--rentalCard").each((idx, rentalCard) => {
            const url = rentalCard.children[1].attribs.href;
            const description = rentalCard.children[3].children[0].data.trim();
            const primaryImage =
                rentalCard.children[5].children[1].children[1].children[1].children
                    .filter((el) => el?.attribs?.srcset !== undefined)
                    .map((el) => el.attribs.srcset)[0];

            const neighborhood =
                rentalCard.children[7].children[1].children[3].children[0].data.trim();
            const address =
                rentalCard.children[7].children[1].children[7].children[1].children[0].data.trim();
            const price =
                rentalCard.children[7].children[1].children[11].children[1].children[0].data.trim();

            results.push({
                url,
                primaryImage,
                description,
                neighborhood,
                address,
                price,
            });
        });

        return results;
    } catch (err) {
        console.log(err);
    }
};
