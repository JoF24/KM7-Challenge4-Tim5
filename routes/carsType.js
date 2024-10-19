const express = require("express");
const {
    validateGetCarsType,
    validateCreateCarsType,
    validateGetCarsTypebyId,
    validateUpdateCarsType,
    validateDeleteCarsTypebyId,
} = require("../middlewares/carsType")
const {
    getCarsType,
    createCarsType,
    getCarsTypebyId,
    updateCarsType,
    deleteCarsTypebyId,
} = require("../controllers/carsType")
const router = express.Router();

router.get("/", validateGetCarsType, getCarsType);
router.post("/", validateCreateCarsType, createCarsType);
router.get('/:id', validateGetCarsTypebyId, getCarsTypebyId);
router.put("/:id", validateUpdateCarsType, updateCarsType);
router.delete("/:id", validateDeleteCarsTypebyId, deleteCarsTypebyId);

module.exports = router;