const express = require("express");
const router = express.Router();

router.get("/:id/public", (req, res) => {
  res.send("Route Organization public");
});

module.exports = router;
