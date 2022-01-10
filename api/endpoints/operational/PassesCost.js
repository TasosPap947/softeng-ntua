const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const util = require("util");
const moment = require('moment');

const response = require("../../utilities/FormattedResponse.js");
const { conString } = require("../../utilities/definitions.js");

async function PassesCost(req, res) {

  const { op1_ID, op2_ID, date_from, date_to } = req.params;
  const format = req.query.format;


  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  const currentTimestamp = moment().format(dateFormat);

  //PassesList query
  const PassesListQuery = `
  SELECT
    COUNT(p.passID) as NumberOfPasses,
    SUM(p.charge) as PassesCost
  FROM
    Passes p JOIN Vehicle v ON (p.VehiclevehicleID = v.vehicleID AND
    ? = v.tagProvider)
  WHERE
		? = (SELECT s.stationProvider FROM Station s WHERE p.StationstationID = s.stationID) AND
        DateAndTime BETWEEN ? AND ?
        ORDER BY p.DateAndTime ASC`;

  try {
    //create connection with database
    const conn = await mysql.createConnection(conString);
    const query = util.promisify(conn.query).bind(conn);

    //do query for PassesList
    const PassesListRes = await query(PassesListQuery, [
      op2_ID,
      op1_ID,
      date_from,
      date_to
    ]);
    //if no result given send error message
    if (!PassesListRes[0]) {
      response(res, 402, {message: "No available data for specified " +
      "providers and time period."});
    }

    const numberOfPasses = PassesListRes[0].NumberOfPasses;
    const passesCost = PassesListRes[0].PassesCost;

    //send final response
    response(res, 200, {
      op1_ID: op1_ID,
      op2_ID: op2_ID,
      RequestTimestamp: currentTimestamp,
      PeriodFrom: date_from,
      PeriodTo: date_to,
      NumberOfPasses: numberOfPasses,
      PassesCost: passesCost
    }, format);

    conn.end();

  } catch (err) {
    response(res, 500, {message: 'Internal server error', error: String(err)}, format);
    conn.end();
  }
}

router.get("/PassesCost/:op1_ID/:op2_ID/:date_from/:date_to", PassesCost);

module.exports = router;
