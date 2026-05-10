const express = require("express");

const router = express.Router();

const {
  addMobile,
  getMobiles,
} = require("../controllers/mobileController");

router.post("/add", addMobile);
router.get("/all", getMobiles);

module.exports = router;