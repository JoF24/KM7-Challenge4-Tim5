const express = require("express");
const carsTypeRouter = require("./carsType");

const router = express.Router();

router.use("/carsType", carsTypeRouter);

module.exports = router;