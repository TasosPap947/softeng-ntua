const express = require("express");
const router = express.Router();

function resetvehicles(req, res) {
  res.send("resetvehicles");
}

router.post("/admin/resetvehicles", resetvehicles);

module.exports = router;
