const express = require("express");
const carsTypeRouter = require("./carsType");
const carsManufactureRouter = require("./carsManufacture");

const router = express.Router();

router.use("/cars", carsRouter);
router.use("/carsModel", carsModelRouter);
router.use("/carsType", carsTypeRouter);
router.use("/carsManufacture", carsManufactureRouter);

module.exports = router;