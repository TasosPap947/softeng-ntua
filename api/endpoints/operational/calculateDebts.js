const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const util = require("util");
const moment = require('moment');

const response = require("../../utilities/responseFunctions.js");
const { conString } = require("../../utilities/definitions.js");

const { host, port, baseURL } = require("../../utilities/definitions.js");

async function calculateDebts(req, res) {

    const { op_ID, date_from, date_to } = req.params;
    const format = req.query.format;

    const dateFormat = 'YYY-MM-DD HH:mm:ss';
    const currentTimestamp = moment().format(dateFormat);

    const OperatorQuery = `
    SELECT UPPER(SUBSTRING(stationID,1,2)) as operatorID
    FROM Station
    GROUP BY operatorID
    ORDER BY operatorID;`;

    const PassesCostQuery = `
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

    try {
        const conn = await mysql.createConnection(conString);
        const query = util.promisify(conn.query).bind(conn);

        const OperatorRes = await query(OperatorQuery);

        var DebtList = [];

        for (var i = 0; i < OperatorRes.length; i++) {
            const BeneficiaryOperator = OperatorRes[i].operatorID;
            if (BeneficiaryOperator == op_ID) continue;
            const expense = await query(PassesCostQuery, [
                op_ID,
                BeneficiaryOperator,
                date_from,
                date_to
            ]);
            const income = await query(PassesCostQuery, [
                BeneficiaryOperator,
                op_ID,
                date_from,
                date_to
            ]);
            var debt = (expense[0].PassesCost - income[0].PassesCost);
            if (debt < 0) debt = 0;
            const item = {
                BeneficiaryOperator: BeneficiaryOperator,
                Income: income[0].PassesCost,
                Expense : expense[0].PassesCost, 
                Debt: debt
                };

            DebtList.push(item);
        }
        response.general(res, 200, {
            op_ID : op_ID,
            RequestTimestamp: currentTimestamp,
            PeriodFrom: date_from,
            PeriodTo: date_to,
            DebtList: DebtList
        }, format);
    }
    catch (err) {
        response.general(res, 500, { message: 'Internal server error', error: String(err) }, format);
        conn.end();
    }
}
router.get("/calculateDebts/:op_ID/:date_from/:date_to", calculateDebts);
module.exports = router;