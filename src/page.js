const getProxyConfig = require("./proxy");

module.exports = generateSecurePage = async (browser) => {
    console.log("Configuring Page for Headless Browsing...\n");

    // Get Proxy Config
    const { PROXY_USERNAME, PROXY_PASSWORD } = getProxyConfig();

    // Create page in browser
    const [page] = await browser.pages();
    await page.authenticate({
        username: PROXY_USERNAME,
        password: PROXY_PASSWORD,
    });

    // Block resources from loading to speed up request
    await page.setRequestInterception(true);
    page.on("request", (request) => {
        if (
            ["image", "stylesheet", "font", "script"].indexOf(
                request.resourceType(),
            ) !== -1
        ) {
            request.abort();
        } else {
            request.continue();
        }
    });

    // Override window navigator and load page
    await page.evaluateOnNewDocument(() => {
        // overwrite the `plugins` property to use a custom getter
        Object.defineProperty(navigator, "webdriver", {
            get: () => false,
        });

        // overwrite the `plugins` property to use a custom getter
        Object.defineProperty(navigator, "plugins", {
            get: () => [1, 2, 3, 4, 5],
        });

        // overwrite the `languages` property to use a custom getter
        Object.defineProperty(navigator, "languages", {
            get: () => ["en-US", "en"],
        });
    });

    // Enable javascript so we do not get blocked
    await page.setJavaScriptEnabled(true);

    // Extend timeout a bit if your internet is wonky
    page.setDefaultNavigationTimeout(120000);

    return page;
};
