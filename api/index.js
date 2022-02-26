const express = require("express");
const app = express();
const port = 9103;
const host = "localhost";

/* HTTP status codes */
const SUCCESS = 200;
const BAD_REQUEST = 400;
const NOT_AUTHORIZED = 401;
const NO_DATA = 402;
const INTERNAL_SERVER_ERROR = 500;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`);
});

const endpointsPath = "./endpoints";
const adminEndpointsPath = `${endpointsPath}/admin`;
const operationalEndpointsPath = `${endpointsPath}/operational`;

const baseURL = `/interoperability/api`;

/* admin endpoints */
const healthcheck = require(`${adminEndpointsPath}/healthcheck.js`);
const resetpasses = require(`${adminEndpointsPath}/resetpasses.js`);
const resetstations = require(`${adminEndpointsPath}/resetstations.js`);
const resetvehicles = require(`${adminEndpointsPath}/resetvehicles.js`);

app.use(baseURL, healthcheck);
app.use(baseURL, resetpasses);
app.use(baseURL, resetstations);
app.use(baseURL, resetvehicles);

/* operational endpoints */
const ChargesBy = require(`${operationalEndpointsPath}/ChargesBy.js`);
const PassesAnalysis = require(`${operationalEndpointsPath}/PassesAnalysis.js`);
const PassesCost = require(`${operationalEndpointsPath}/PassesCost.js`);
const PassesPerStation = require(`${operationalEndpointsPath}/PassesPerStation.js`);
const calculateDebts = require(`${operationalEndpointsPath}/calculateDebts.js`);
const insertPass = require(`${operationalEndpointsPath}/insertPass.js`);
const operatorList = require(`${operationalEndpointsPath}/operatorList.js`);

app.use(baseURL, ChargesBy);
app.use(baseURL, PassesAnalysis);
app.use(baseURL, PassesCost);
app.use(baseURL, PassesPerStation);
app.use(baseURL, calculateDebts);
app.use(baseURL, insertPass);
app.use(baseURL, operatorList);
