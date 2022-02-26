const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const util = require("util");
const moment = require('moment');

const response = require("../../utilities/responseFunctions.js");
const { conString } = require("../../utilities/definitions.js");

const { host, port, baseURL } = require("../../utilities/definitions.js");

async function operatorList(req, res) {

    const format = req.query.format;

    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const currentTimestamp = moment().format(dateFormat);

    const OperatorQuery = `
    SELECT stationProvider as operatorName,
        UPPER(SUBSTRING(stationID,1,2)) as operatorID
    FROM Station
    GROUP BY operatorName, operatorID
    ORDER BY operatorID;`;

    try {
        const conn = await mysql.createConnection(conString);
        const query = util.promisify(conn.query).bind(conn);

        const OperatorRes = await query(OperatorQuery);

        response.general(res, 500, {
            RequestTimestamp: currentTimestamp,
            NumberOfOperators: OperatorRes.length,
            operators: OperatorRes
        }, format);


        
    }
    catch (err) {
        response.general(res, 500, { message: 'Internal server error', error: String(err) }, format);
        conn.end();
    }
}
router.get("/operatorList", operatorList);
module.exports = router;