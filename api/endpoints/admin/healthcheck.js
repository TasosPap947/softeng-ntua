const express = require("express");
const router = express.Router();

function healthcheck(req, res) {
  res.send("healthcheck");
}

router.get("/admin/healthcheck", healthcheck);

module.exports = router;
