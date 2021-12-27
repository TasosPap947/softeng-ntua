const express = require("express");
const router = express.Router();

function resetstations(req, res) {
  res.send("resetstations");
}

router.post("/admin/resetstations", resetstations);

module.exports = router;
