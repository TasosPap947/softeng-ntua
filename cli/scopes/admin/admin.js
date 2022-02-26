const axios = require("axios");
const env = require("../../env.js");
const mysql = require("mysql");
const response = require("../../responseFunctions.js");

function adminFunction(passesupd, source) {
    const con = mysql.createConnection(env.conString);

    console.log(source);
    const insertQuery = `
    LOAD DATA INFILE
    '${source}'
    INTO TABLE Passes
    FIELDS TERMINATED BY ';'
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS
    (passID, @a, StationstationID, VehiclevehicleID, charge)
    SET DateAndTime = str_to_date(@a, '%e/%c/%Y %H:%i');            
    `;

    con.query(insertQuery, (err, result) => {
        if (err) {
            console.log(err);
            const data = { status: "failed", message: err };
            console.log(data);
        } else {
            console.log(result);
            const data = { status: "OK" };
            console.log(data);
        }
    });
    con.end();
}

module.exports = { adminFunction };
