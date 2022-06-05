const cheerio = require("cheerio");
const {
    convertXpathItemsToSchema,
    extractContentFromPage,
    sleep,
} = require("./utils");

const scrapeCorcoran = async (endpoint, page) => {
    try {
        console.log("Navigating to Corcoran search page...");

        // Access browser page
        const response = await page.goto(endpoint);

        // let data load and scroll to bottom to load images
        await sleep(10000);

        await page.evaluate(() => {
            document
                .querySelector(
                    ".ListingCard__ListingCardWrapper-sc-k9s72e-7:last-child",
                )
                .scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "end",
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        const content = await page.content();

        const $ = cheerio.load(content);
        const numberOfElements = $(
            ".ListingCard__ListingCardWrapper-sc-k9s72e-7",
        ).length;

        const xpathCommon =
            "/html/body/div[1]/div/main/section/div[1]/div[3]/div[2]/div[";
        const xpathDesc = "]/div[2]/h2";
        const xpathHood = "]/div[2]/div[1]";
        const xpathAddress = "]/div[2]/h2";
        const xpathBed = "]/div[2]/div[2]/ul[1]/li[2]";
        const xpathPrice = "]/div[3]/div/div";
        const xpathPic = "]/div[1]/span/img";
        const xpathBath = "]/div[2]/div[2]/ul[1]/li[3]";
        const xpathUrl = "]/a";
        const xpathItems = [
            { xpath: xpathDesc, get: "textContent", prop: "description" },
            { xpath: xpathAddress, get: "textContent", prop: "address" },
            { xpath: xpathBed, get: "textContent", prop: "beds" },
            { xpath: xpathPrice, get: "textContent", prop: "price" },
            { xpath: xpathBath, get: "textContent", prop: "baths" },
            { xpath: xpathPic, get: "src", prop: "primaryImage" },
            { xpath: xpathUrl, get: "href", prop: "url" },
            { xpath: xpathHood, get: "textContent", prop: "neighborhood" },
        ];

        const allResults = await convertXpathItemsToSchema(
            page,
            xpathCommon,
            xpathItems,
            numberOfElements,
            "Corcoran",
        );

        return allResults;
    } catch (err) {
        if (err.message.includes("TypeError: Cannot read properties of null")) {
            return [];
        } else {
            throw err;
        }
    }
};

const scrapeCompass = async (endpoint, page) => {
    console.log("Navigating to Compass search page...");
    const content = await extractContentFromPage(endpoint, page);
    const $ = cheerio.load(content);

    const numberOfElements = $(
        ".CardViewWrapper-sc-caer1o > .uc-lolCardView > .uc-lolCardView-cardsContainer > .uc-lolCardView-cards > .uc-listingPhotoCard",
    ).length;
    const xpathCommon = "/html/body/main/div/div[1]/div[2]/div[1]/div/div/div[";

    const xpathDesc = "]/div/div[3]/div[2]/div[1]/h2";
    const xpathHood = "]/div/div[3]/div[2]/div[1]/h2";
    const xpathAddress = "]/div/div[3]/div[2]/div[1]/h2/a";
    const xpathBed = "]/div/div[3]/div[2]/div[2]/div[1]";
    const xpathPrice = "]/div/div[3]/div[2]/div[1]/div/strong";
    const xpathPic = "]/div/div[1]/img";
    const xpathBath = "]/div/div[3]/div[2]/div[2]/div[2]";
    const xpathUrl = "]/div/div[3]/div[2]/div[1]/h2/a";

    const xpathItems = [
        { xpath: xpathDesc, get: "textContent", prop: "description" },
        { xpath: xpathAddress, get: "textContent", prop: "address" },
        { xpath: xpathBed, get: "textContent", prop: "beds" },
        { xpath: xpathPrice, get: "textContent", prop: "price" },
        { xpath: xpathBath, get: "textContent", prop: "baths" },
        { xpath: xpathPic, get: "src", prop: "primaryImage" },
        { xpath: xpathUrl, get: "href", prop: "url" },
        { xpath: xpathHood, get: "textContent", prop: "neighborhood" },
    ];

    const allResults = await convertXpathItemsToSchema(
        page,
        xpathCommon,
        xpathItems,
        numberOfElements,
        "Compass",
    );
    // console.log(allResults);

    return allResults;
};

const scrapeStreeteasy = async (endpoint, page) => {
    try {
        console.log("Navigating to Streeteasy search page...");
        const content = await extractContentFromPage(endpoint, page);
        const $ = cheerio.load(content);

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
        throw err;
    }
};

module.exports = {
    scrapeStreeteasy,
    scrapeCorcoran,
    scrapeCompass,
};
