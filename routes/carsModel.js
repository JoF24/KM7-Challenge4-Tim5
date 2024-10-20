const express = require("express");
const {
    validateGetCarsModel,
    validateCreateCarModel,
    validateGetCarModelbyId,
    validateUpdateCarModel,
    validateDeleteCarModelbyId,
} = require("../middlewares/carsModel");
const {
    getCarsModel,
    createCarModel,
    getCarModelbyId,
    updateCarModel,
    deleteCarModelbyId, 
} = require("../controllers/carsModel");
const router = express.Router();

router.get("/", validateGetCarsModel, getCarsModel);
router.post("/", validateCreateCarModel, createCarModel);
router.get('/:id', validateGetCarModelbyId, getCarModelbyId);
router.put("/:id", validateUpdateCarModel, updateCarModel);
router.delete("/:id", validateDeleteCarModelbyId, deleteCarModelbyId);

module.exports = router;
