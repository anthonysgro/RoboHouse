const { Rental } = require("../server/db");

const isRentalUrlUnique = async (url) => {
    try {
        const token = await Rental.findOne({ where: { url } });
        return token === null;
    } catch (err) {
        return err;
    }
};

const batchCreateRentalsIfNotExists = async (rentals) => {
    try {
        if (rentals.length === 0) return;

        const createQueue = [];
        for (const rental of rentals) {
            const isNew = await isRentalUrlUnique(rental.url);
            if (isNew) {
                // console.log("New apartment found:", rental);
                createQueue.push(Rental.create(rental));
            } else {
                break;
            }
        }

        const newRentals = await Promise.all(createQueue);

        return newRentals;
    } catch (err) {
        console.log(err);
        return err;
    }
};

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

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
            xpathItems.map(({ xpath }) => {
                return page.$x(`${commonXpath}${i + 1}${xpath}`);
            }),
        );

        const enrichedXpaths = xpathItems.map((item, idx) => {
            item.element = elementsArr[idx][0];
            item.fullXpath = `${commonXpath}${i + 1}${item.xpath}`;
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

const extractContentFromPage = async (endpoint, page) => {
    try {
        // Access browser page
        const response = await page.goto(endpoint, {
            waitUntil: "domcontentloaded",
        });

        return await page.content();
    } catch (err) {
        console.error(err);
        return err;
    }
};

const scrollTo = async (page, className) => {
    await page.evaluate(() => {
        document.querySelector(className).scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "end",
        });
    });
};

module.exports = {
    isRentalUrlUnique,
    sleep,
    batchCreateRentalsIfNotExists,
    convertXpathItemsToSchema,
    extractContentFromPage,
    scrollTo,
};
