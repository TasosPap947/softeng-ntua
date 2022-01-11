const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const response = require("../../utilities/responseFunctions.js");
const { conString } = require("../../utilities/definitions.js");

//checks end-to-end connectivity (client connected to database)
function healthcheck(req, res) {

  const con = mysql.createConnection(conString);

  const format = req.query.format;

  con.connect(function (err) {
    if (err) {
      const data = { "status": "failed", "dbconnection": conString };
      response.general(res, 500, data, format);
    }
    else {
      const data = { "status": "OK", "dbconnection": conString };
      response.general(res, 200, data, format);
    }
    con.end();
  });
}

router.get("/admin/healthcheck", healthcheck);

module.exports = router;
