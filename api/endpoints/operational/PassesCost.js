const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const util = require("util");
const moment = require("moment");

const response = require("../../utilities/responseFunctions.js");
const { conString } = require("../../utilities/definitions.js");

async function PassesCost(req, res) {
    const { op1_ID, op2_ID, date_from, date_to } = req.params;
    const format = req.query.format;

    const dateFormat = "YYYY-MM-DD HH:mm:ss";
    const currentTimestamp = moment().format(dateFormat);

    //PassesList query
    const PassesListQuery = `
  SELECT
    COUNT(p.passID) as NumberOfPasses,
    SUM(p.charge) as PassesCost
  FROM
    Passes p JOIN Vehicle v ON (p.VehiclevehicleID = v.vehicleID AND
    ? = v.ProviderAbbr)
  WHERE
		? = (SELECT SUBSTRING(s.stationID,1,2) FROM Station s WHERE p.StationstationID = s.stationID) AND
        DateAndTime BETWEEN ? AND ?
        ORDER BY p.DateAndTime ASC`;

    let conn;
    try {
        //create connection with database
        conn = await mysql.createConnection(conString);
        const query = util.promisify(conn.query).bind(conn);

        //do query for PassesList
        const PassesListRes = await query(PassesListQuery, [op2_ID, op1_ID, date_from, date_to]);

        //if no result given send error message
        if (!PassesListRes[0].NumberOfPasses) {
            response.general(
                res,
                402,
                {
                    op1_ID: op1_ID,
                    op2_ID: op2_ID,
                    RequestTimestamp: currentTimestamp,
                    PeriodFrom: date_from,
                    PeriodTo: date_to,
                    NumberOfPasses: PassesListRes[0].NumberOfPasses,
                    PassesCost: 0,
                    message: "No available data for specified providers and time period.",
                },
                format
            );
            conn.end();
            return 0;
        }

        const numberOfPasses = PassesListRes[0].NumberOfPasses;
        const passesCost = PassesListRes[0].PassesCost;

        //send final response
        response.general(
            res,
            200,
            {
                op1_ID: op1_ID,
                op2_ID: op2_ID,
                RequestTimestamp: currentTimestamp,
                PeriodFrom: date_from,
                PeriodTo: date_to,
                NumberOfPasses: numberOfPasses,
                PassesCost: passesCost,
            },
            format
        );

        conn.end();
    } catch (err) {
        response.general(res, 500, { message: "Internal server error", error: String(err) }, format);
        conn.end();
    }
}

router.get("/PassesCost/:op1_ID/:op2_ID/:date_from/:date_to", PassesCost);

module.exports = router;
