const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const response = require("../../utilities/responseFunctions.js");
const { conString } = require("../../utilities/definitions.js");

function resetstations(req, res) {
    const con = mysql.createConnection(conString);

    const format = req.query.format;

    const delete_query = "DELETE FROM Station";
    const insert_query = `
    LOAD DATA INFILE
    '/home/nick/stations.csv'
    INTO TABLE Station
    FIELDS TERMINATED BY ';'
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS
    (stationID, stationProvider, stationName);
    `;

    con.query(delete_query, (err, result) => {
        if (err) {
            console.log(err);
            const data = { status: "failed", message: err };
            response.general(res, 500, data, format);
        } else {
            con.query(insert_query, (err, result) => {
                if (err) {
                    console.log(err);
                    const data = { status: "failed", message: err };
                    response.general(res, 500, data, format);
                } else {
                    console.log(result);
                    const data = { status: "OK" };
                    response.general(res, 200, data, format);
                }
            });
        }
        con.end();
    });
}

router.post("/admin/resetstations", resetstations);

module.exports = router;
