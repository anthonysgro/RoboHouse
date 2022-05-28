const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");

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
        slowMo: 0,
        defaultViewport: null,
        args: [
            "--no-sandbox",
            "--disable-gpu",
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

        // If browser is killed, close it
        // browser.on("kill", async (done) => {
        //     console.log("\x1b[32m", "Killing browser...");
        //     if (browser !== null) {
        //         await browser.close();
        //     }

        //     done();
        // });

        console.log(`Connected to Chromium Browser with Proxy: `);
        console.log(`http://${PROXY_SERVER}:${PROXY_SERVER_PORT}\n`);

        return browser;
    } catch (err) {
        console.error(err);
    }
};
