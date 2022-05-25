const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
const configurePageForHeadlessBrowsing = require("./page");
const getProxyConfig = require("./proxy");

// Puppeteer Config
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

module.exports = launchBrowser = async (headless) => {
    // Get Proxy Config
    const { PROXY_SERVER, PROXY_SERVER_PORT } = getProxyConfig();

    // Browser Config
    const chromiumVersion = "991974";
    const chromeOptions = {
        ignoreHTTPSErrors: true,
        slowMo: 250,
        defaultViewport: null,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-infobars",
            "--window-position=0,0",
            "--ignore-certifcate-errors",
            "--ignore-certifcate-errors-spki-list",
            '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
            `--proxy-server=http://${PROXY_SERVER}:${PROXY_SERVER_PORT}`,
        ],
    };
    const browserFetcher = puppeteer.createBrowserFetcher();

    try {
        const revisionInfo = await browserFetcher.download(chromiumVersion);

        const browser = await puppeteer.launch({
            ...chromeOptions,
            executablePath: revisionInfo.executablePath,
            headless,
        });

        console.log("\x1b[32m", `Connected to Chromium Browser with Proxy: `);
        console.log(
            "\x1b[36m",
            `http://${PROXY_SERVER}:${PROXY_SERVER_PORT}\n`,
        );

        return browser;
    } catch (err) {
        console.error(err);
    }
};
