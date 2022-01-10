const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const util = require("util");
const moment = require('moment');

const response = require("../../utilities/FormattedResponse.js");
const { conString } = require("../../utilities/definitions.js");

async function ChargesBy(req, res) {

  const { op_ID, date_from, date_to } = req.params;
  const format = req.query.format;

  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  const currentTimestamp = moment().format(dateFormat);

  //PassesList query
  const PPOListQuery = `
  SELECT
	v.tagProvider as VisitingOperator,
    COUNT(p.passID) as NumberOfPasses,
    SUM(p.charge) as PassesCost
  FROM
    Passes p JOIN Vehicle v ON (p.VehiclevehicleID = v.vehicleID)
  WHERE
    v.tagProvider != ? AND
		? = (SELECT s.stationProvider FROM Station s WHERE p.StationstationID = s.stationID) AND
        DateAndTime BETWEEN ? AND ?
        GROUP BY v.tagProvider
		`;

  try {
    //create connection with database
    const conn = await mysql.createConnection(conString);
    const query = util.promisify(conn.query).bind(conn);

    //do query for PassesList
    const PPOListRes = await query(PPOListQuery, [
      op_ID,
      op_ID,
      date_from,
      date_to
    ]);

    //if no result given send error message
    if (!PPOListRes[0]) {
      response(res, 402, {message: "No available data for specified " +
      "provider and time period."});
    }

    //Parse result as JS Object and compute total length
    const PPOList = JSON.parse(JSON.stringify(PPOListRes));

    //Send final response
    response(res, 200, {
      op_ID: op_ID,
      RequestTimestamp: currentTimestamp,
      PeriodFrom: date_from,
      PeriodTo: date_to,
      PPOList: PPOList
    }, format);

    conn.end();

  } catch (err) {
    response(res, 500, {message: 'Internal server error', error: String(err)}, format);
    conn.end();
  }
}

router.get("/ChargesBy/:op_ID/:date_from/:date_to", ChargesBy);

module.exports = router;
