const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const response = require("../../utilities/FormattedResponse.js");
const { conString } = require("../../utilities/definitions.js");

function resetpasses(req, res) {

  const con = mysql.createConnection(conString);

  const format = req.query.format;

  const sql = 'DELETE FROM Passes';

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      const data = {"status":"failed"};
      response(res, 500, data, format);
    }
    else {
      console.log(result);
      const data = {"status":"OK"};
      response(res, 200, data, format);
    }
  })
}

router.post("/admin/resetpasses", resetpasses);

module.exports = router;
