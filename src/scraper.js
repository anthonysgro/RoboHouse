const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const cheerio = require("cheerio");
const { _attributes } = require("../server/db/db");
const { Item } = require("semantic-ui-react");

let browser;

const convertXpathItemsToSchema = async (
    page,
    commonXpath,
    xpathItems,
    numberOfElements,
    site,
) => {
    const allResults = [];
    for (let i = 0; i < numberOfElements; i++) {
        const elementsArr = await Promise.all(
            xpathItems.map(({ xpath }) =>
                page.$x(`${commonXpath}${i + 1}${xpath}`),
            ),
        );

        const enrichedXpaths = xpathItems.map((item, i) => {
            item.element = elementsArr[i][0];
            return item;
        });

        const handles = await Promise.all(
            enrichedXpaths.map(({ element, get }) => element.getProperty(get)),
        );

        const vals = (
            await Promise.all(handles.map((handle) => handle.jsonValue()))
        ).map((val) => val.trim());

        const listing = {
            description: vals[0],
            address: vals[1],
            price: vals[3],
            beds: vals[2],
            baths: vals[4],
            primaryImage:
                vals[5].slice(0, 2) !== "//"
                    ? vals[5]
                    : vals[5].slice(2, vals[5].length),
            url: vals[6],
            site: site,
            neighborhood: vals[7],
        };

        allResults.push(listing);
    }

    return allResults;
};

const scrapeStreeteasy = async (endpoint, page) => {
    try {
        console.log("Navigating to Streeteasy search page...\n");

        // Access browser page
        const response = await page.goto(endpoint, {
            waitUntil: "domcontentloaded",
        });

        const content = await page.content();
        const $ = cheerio.load(content);

        const results = [];

        const xpathCommon =
            "/html/body/div[1]/div[1]/div[2]/div[2]/div[1]/main/div[2]/div[2]/div[2]/div/div/ul/li[";

        const xpathDesc = "]/div/span";
        const xpathHood = "]/div/div[2]/div[1]/p[1]";
        const xpathAddress = "]/div/div[2]/div[1]/address/a";
        const xpathBed = "]/div/div[2]/div[2]/div/div/div[1]/span[2]";
        const xpathPrice = "]/div/div[2]/div[1]/div/span";
        const xpathPic = "]/div/div[1]/figure/a/picture/source[1]";
        const xpathBath = "]/div/div[2]/div[2]/div/div/div[3]/span[2]";
        const xpathUrl = "]/div/a";

        const numberOfElements = $(".listingCard--rentalCard").length;
        const xpathItems = [
            { xpath: xpathDesc, get: "textContent", prop: "description" },
            { xpath: xpathAddress, get: "textContent", prop: "address" },
            { xpath: xpathBed, get: "textContent", prop: "beds" },
            { xpath: xpathPrice, get: "textContent", prop: "price" },
            { xpath: xpathBath, get: "textContent", prop: "baths" },
            { xpath: xpathPic, get: "srcset", prop: "primaryImage" },
            { xpath: xpathUrl, get: "href", prop: "url" },
            { xpath: xpathHood, get: "textContent", prop: "neighborhood" },
        ];

        const allResults = await convertXpathItemsToSchema(
            page,
            xpathCommon,
            xpathItems,
            numberOfElements,
            "Streeteasy",
        );

        return allResults;
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    scrapeStreeteasy,
};
