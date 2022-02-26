const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const util = require("util");
const moment = require('moment');

const response = require("../../utilities/responseFunctions.js");
const { conString } = require("../../utilities/definitions.js");

function makePassID() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var numbers = '0123456789';
    var charactersLength = characters.length;
    var numbersLength = numbers.length;
    for (var i = 0; i < 3; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    for (var i = 0; i < 7; i++) {
        result += numbers.charAt(Math.floor(Math.random() *
            numbersLength));
    }
    return result;
}

async function insertPass(req, res) {

    const { charge, vehicleID, stationID } = req.params;
    const format = req.query.format;

    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const currentTimestamp = moment().format(dateFormat);

    const insertQuery = `INSERT INTO \`Passes\` VALUES (?, ?, ?, ?, ?);`;

    var duplicate = true;

    const passID = makePassID();
    try {
        const conn = await mysql.createConnection(conString);
        const query = util.promisify(conn.query).bind(conn);
        const result = await query(insertQuery, [
            passID,
            currentTimestamp,
            charge,
            vehicleID,
            stationID
        ]);
        response.general(res, 200, {
            status: "OK",
            RequestTimestamp: currentTimestamp,
            ItemInserted: {
                passID: passID,
                DateAndTime: currentTimestamp,
                charge: charge,
                VehiclevehicleID: vehicleID,
                StationstationID: stationID
            }
        }, format);
        conn.end();
    }
    catch (err) {
        response.general(res, 500, { status: failed, message: 'Internal server error', error: String(err) }, format);
        conn.end();
    }
}

router.post("/insertPass/:charge/:vehicleID/:stationID", insertPass);
module.exports = router;