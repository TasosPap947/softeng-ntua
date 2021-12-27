const express = require("express");
const router = express.Router();

function resetpasses(req, res) {
  res.send("resetpasses");
}

router.post("/admin/resetpasses", resetpasses);

module.exports = router;
