const express = require("express");
const router = express.Router();

function PassesPerStation(req, res) {
  res.send({
    function: "PassesPerStation",
    stationID: req.params.stationID,
    date_from: req.params.date_from,
    date_to: req.params.date_to,
  });
}

router.get(
  "/PassesPerStation/:stationID/:date_from/:date_to",
  PassesPerStation
);

module.exports = router;
