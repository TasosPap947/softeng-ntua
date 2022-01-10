const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const util = require("util");
const moment = require('moment');

const response = require("../../utilities/FormattedResponse.js");
const { conString } = require("../../utilities/definitions.js");

async function PassesPerStation(req, res) {

  const { stationID, date_from, date_to } = req.params;
  const format = req.query.format;

  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  const currentTimestamp = moment().format(dateFormat);

  //Operator Name query
  const stationOperatorQuery = `
  SELECT StationProvider as StationOperator
  FROM Station WHERE stationID = ?`;

  //Pass List query
  const passesListQuery = `
  SELECT p.passID as PassID, p.DateAndTime as PassTimeStamp,
  v.vehicleID as VehicleID, v.tagProvider as TagProvider,
  CASE
    WHEN v.tagProvider = ?
    THEN 'home' ELSE 'visitor'
  END as PassType
  FROM Passes p JOIN Vehicle v ON (p.VehiclevehicleID = v.vehicleID)
  WHERE p.StationstationID = ? AND p.DateAndTime BETWEEN ? AND ?
  ORDER BY p.DateAndTime ASC`;

  try {
    //create connection with database
    const conn = await mysql.createConnection(conString);
    const query = util.promisify(conn.query).bind(conn);

    //do first query for Operator Name
    const stationOperatorRes = await query(stationOperatorQuery, [stationID]);
    //if no result given send error message
    if (!stationOperatorRes[0]) {
      response(res, 400, {message: "Invalid stationID given"}, format);
    }
    //store result in staionOperator
    const stationOperator = stationOperatorRes[0].StationOperator;

    //do second query for passesList
    const passesListRes = await query(passesListQuery, [
      stationOperator,
      stationID,
      date_from,
      date_to
    ]);
    //if no result given send error message
    if (!passesListRes[0]) {
      response(res, 402, {message: "No available data for specified stationID"
      +"and time period."});
    }
    //Parse result as JS Object and compute total length
    let passesList = JSON.parse(JSON.stringify(passesListRes));
    let i = 0;
    passesList.forEach((pass) => {
        pass.PassIndex = ++i;
    });

    //send final response
    response(res, 200, {
      Station: stationID,
      StationOperator: stationOperator,
      RequestTimestamp:currentTimestamp,
      PeriodFrom: date_from,
      PeriodTo: date_to,
      NumberOfPasses: i,
      PassesList: passesList
    }, format);

    conn.end();

  } catch (err) {
    response(res, 500, {message: 'Internal server error', error: String(err)}, format);
    conn.end();
  }

}

router.get(
  "/PassesPerStation/:stationID/:date_from/:date_to",
  PassesPerStation
);

module.exports = router;
