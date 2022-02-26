const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const response = require("../../utilities/responseFunctions.js");
const { conString } = require("../../utilities/definitions.js");

function resetvehicles(req, res) {
    const con = mysql.createConnection(conString);

    const format = req.query.format;

    const delete_query = "DELETE FROM Vehicle";
    const insert_query = `
    LOAD DATA INFILE
    '/home/nick/vehicles.csv'
    INTO TABLE Vehicle
    FIELDS TERMINATED BY ';'
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS
    (vehicleID, tagID, tagProvider, providerAbbr, licenseYear);
    `;

    con.query(delete_query, (err, result) => {
        if (err) {
            const data = { status: "failed", message: err };
            response.general(res, 500, data, format);
        } else {
            con.query(insert_query, (err, result) => {
                if (err) {
                    const data = { status: "failed", message: err };
                    response.general(res, 500, data, format);
                } else {
                    const data = { status: "OK" };
                    response.general(res, 200, data, format);
                }
            });
        }
        con.end();
    });
}

router.post("/admin/resetvehicles", resetvehicles);

module.exports = router;
