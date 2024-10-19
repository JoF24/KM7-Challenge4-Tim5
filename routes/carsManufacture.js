const express = require("express");
const {
    validateGetCarsManufacture,
    validateCreateCarsManufacture,
    validateGetCarsManufacturebyId,
    validateUpdateCarsManufacture,
    validateDeleteCarsManufacturebyId,
} = require("../middlewares/carsManufacture")
const {
    getCarsManufacture,
    createCarsManufacture,
    getCarsManufacturebyId,
    updateCarsManufacture,
    deleteCarsManufacturebyId,
} = require("../controllers/carsManufacture")
const router = express.Router();

router.get("/", validateGetCarsManufacture, getCarsManufacture)
router.post("/", validateCreateCarsManufacture, createCarsManufacture);
router.get('/:id', validateGetCarsManufacturebyId, getCarsManufacturebyId);
router.put("/:id", validateUpdateCarsManufacture, updateCarsManufacture);
router.delete("/:id", validateDeleteCarsManufacturebyId, deleteCarsManufacturebyId);

module.exports = router;