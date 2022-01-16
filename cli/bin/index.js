#! /usr/bin/env node
const yargs = require("yargs"); /* maybe commander is a better option */
const axios = require("axios");
const env = require("../env.js");

const functionsDirectory = "../scopes";

/* admin functions */
const adminDirectory = `${functionsDirectory}/admin`;

const { healthcheckFunction } = require(`${adminDirectory}/healthcheck.js`);
const { adminFunction } = require(`${adminDirectory}/admin.js`);
const { resetpassesFunction } = require(`${adminDirectory}/resetpasses.js`);
const { resetstationsFunction } = require(`${adminDirectory}/resetstations.js`);
const { resetvehiclesFunction } = require(`${adminDirectory}/resetvehicles.js`);

/* operational functions */
const operationalDirectory = `${functionsDirectory}/operational`;

const { chargesbyFunction } = require(`${operationalDirectory}/chargesby.js`);
const { passesanalysisFunction } = require(`${operationalDirectory}/passesanalysis.js`);
const { passescostFunction } = require(`${operationalDirectory}/passescost.js`);
const { passesperstationFunction } = require(`${operationalDirectory}/passesperstation.js`);

/* TODO: input validation */
const argv = yargs.argv;

const scope = argv._[0];

const arguments = {
    admin: [argv.passesupd, argv.source] /* make it so it works with admin/passesupd  instead of passesupd */,

    healthcheck: [],
    resetpasses: [],
    resetstations: [],
    resetvehicles: [],

    chargesby: [argv.op1, argv.datefrom, argv.dateto, argv.format],
    passesanalysis: [argv.op1, argv.op2, argv.datefrom, argv.dateto, argv.format],
    passescost: [argv.op1, argv.op2, argv.datefrom, argv.dateto, argv.format],
    passesperstation: [argv.station, argv.datefrom, argv.dateto, argv.format],
};

const functionToCall = {
    admin: adminFunction,

    healthcheck: healthcheckFunction,
    resetpasses: resetpassesFunction,
    resetstations: resetstationsFunction,
    resetvehicles: resetvehiclesFunction,

    chargesby: chargesbyFunction,
    passesanalysis: passesanalysisFunction,
    passescost: passescostFunction,
    passesperstation: passesperstationFunction,
};

if (!arguments[scope].every((item) => item)) {
    console.log(env.usage);
    return;
}

functionToCall[scope](...arguments[scope]);
