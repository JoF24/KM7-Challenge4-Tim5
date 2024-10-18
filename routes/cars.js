const express = require("express");
const {
    validateCreateCar,
} = require("../middlewares/cars");
const {
    createCar,
} = require("../repositories/cars");
const router = express.Router();

router.get('/', (req, res) => {
    const cars = require("../data/cars.json");
    res.json({ cars });
});

router.post("/", validateCreateCar, createCar);

module.exports = router;
