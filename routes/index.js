const express = require("express");
const carsFuelRouter = require("./carsFuel");
const carsTransmissionRouter = require("./carsTransmission");

const router = express.Router();

router.use("/carsFuel", carsFuelRouter);
router.use("/carsTransmission", carsTransmissionRouter);

module.exports = router;