const https = require("https");
const axios = require("axios");

const protocol = "https";
const host = "localhost";
const port = 9103;

const baseURL = `${protocol}://${host}:${port}/interoperability/api`;

const usage = "\nUsage: se2117 <scope> --param1 <value1> [--param2 <value2> ...] --format <fff>";

const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
});

module.exports = { baseURL, usage, instance };
