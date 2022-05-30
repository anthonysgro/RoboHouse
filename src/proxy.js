// URL: https://dashboard.scraperapi.com/dashboard
module.exports = getProxyConfig = () => {
    return {
        PROXY_USERNAME: process.env.PROXY_USERNAME,
        PROXY_PASSWORD: process.env.PROXY_PASSWORD,
        PROXY_SERVER: process.env.PROXY_SERVER,
        PROXY_SERVER_PORT: process.env.PROXY_SERVER_PORT,
    };
};
