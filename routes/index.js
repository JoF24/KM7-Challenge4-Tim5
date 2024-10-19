const express = require("express");
const carsTypeRouter = require("./carsType");
const carsManufactureRouter = require("./carsManufacture");

const router = express.Router();

router.use("/carsType", carsTypeRouter);
router.use("/carsManufacture", carsManufactureRouter);

module.exports = router;