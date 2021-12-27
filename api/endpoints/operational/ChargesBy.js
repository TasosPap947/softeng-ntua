const express = require("express");
const router = express.Router();

function ChargesBy(req, res) {
  res.send({
    function: "ChargesBy",
    op_ID: req.params.op_ID,
    date_from: req.params.date_from,
    date_to: req.params.date_to,
  });
}

router.get("/ChargesBy/:op_ID/:date_from/:date_to", ChargesBy);

module.exports = router;
