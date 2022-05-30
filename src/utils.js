const { Rental } = require("../server/db");

const isRentalUrlUnique = async (url) => {
    try {
        const token = await Rental.findOne({ where: { url } });
        return token === null;
    } catch (err) {
        throw err;
    }
};

const batchCreateRentalsIfNotExists = async (listings) => {
    try {
        if (listings.length === 0) return;

        const createQueue = [];
        for (const listing of listings) {
            const isNew = await isRentalUrlUnique(listing.url);
            if (isNew) {
                console.log("New apartment found:", listing);
                createQueue.push(Rental.create(listing));
            } else {
                break;
            }
        }

        const newRentals = await Promise.all(createQueue);

        return newRentals;
    } catch (err) {
        throw err;
    }
};

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

const tryUntilSucceed = async (promiseFn, maxTries = 3) => {
    try {
        return await promiseFn();
    } catch (err) {
        if (maxTries > 0) {
            return tryUntilSucceed(promiseFn, maxTries - 1);
        }
        throw err;
    }
};

const convertXpathItemsToSchema = async (
    page,
    commonXpath,
    xpathItems,
    numberOfElements,
    site,
) => {
    try {
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
                enrichedXpaths.map(({ element, get }) =>
                    element.getProperty(get),
                ),
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
    } catch (err) {
        throw err;
    }
};

const extractContentFromPage = async (endpoint, page) => {
    try {
        // Access browser page
        const response = await page.goto(endpoint, {
            waitUntil: "domcontentloaded",
        });

        return await page.content();
    } catch (err) {
        throw err;
    }
};

module.exports = {
    isRentalUrlUnique,
    sleep,
    batchCreateRentalsIfNotExists,
    convertXpathItemsToSchema,
    extractContentFromPage,
    tryUntilSucceed,
};
