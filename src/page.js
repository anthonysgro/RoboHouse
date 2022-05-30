const getProxyConfig = require("./proxy");

module.exports = generateSecurePage = async ({
    browser,
    proxyEnabled,
    interceptScripts,
}) => {
    try {
        console.log("Configuring Page for Headless Browsing...");

        // Get Proxy Config
        const { PROXY_USERNAME, PROXY_PASSWORD } = getProxyConfig();

        // Create page in browser
        const [page] = await browser.pages();

        // Enable proxy if desired
        if (proxyEnabled) {
            await page.authenticate({
                username: PROXY_USERNAME,
                password: PROXY_PASSWORD,
            });
        }

        const requestsToIntercept = interceptScripts
            ? ["image", "stylesheet", "font", "script"]
            : ["image", "stylesheet", "font"];

        // Block resources from loading to speed up request
        await page.setRequestInterception(true);
        page.on("request", (request) => {
            if (requestsToIntercept.indexOf(request.resourceType()) !== -1) {
                request.abort();
            } else {
                request.continue();
            }
        });

        // // Override window navigator and load page
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
    } catch (err) {
        throw err;
    }
};
