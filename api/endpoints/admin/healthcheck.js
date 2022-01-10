const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const response = require("../../utilities/FormattedResponse.js");
const { conString } = require("../../utilities/definitions.js");

//checks end-to-end connectivity (client connected to database)
function healthcheck(req, res) {

  const con = mysql.createConnection(conString);

  const format = req.query.format;

  con.connect ( function(err) {
    if (err) {
      const data = {"status":"failed","dbconnection": conString};
      response(res, 500, data, format);
    }
    else {
      const data = {"status":"OK", "dbconnection": conString};
      response(res, 200, data, format);
    }
  });
}

router.get("/admin/healthcheck", healthcheck);

module.exports = router;
