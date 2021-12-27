const express = require("express");
const router = express.Router();

function PassesAnalysis(req, res) {
  res.send({
    function: "PassesAnalysis",
    op1_ID: req.params.op1_ID,
    op2_ID: req.params.op2_ID,
    date_from: req.params.date_from,
    date_to: req.params.date_to,
  });
}

router.get(
  "/PassesAnalysis/:op1_ID/:op2_ID/:date_from/:date_to",
  PassesAnalysis
);

module.exports = router;
