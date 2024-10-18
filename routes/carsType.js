const express = require("express");
const {
    validateGetCarsTypebyId,
    validateCreateCarsType,
    validateUpdateCarsType,
    validateDeleteCarsTypebyId,
} = require("../middlewares/carsType")
const {
    getCarsTypebyId,
    createCarsType,
    updateCarsType,
    deleteCarsTypebyId,
} = require("../controllers/carsType")
const router = express.Router();

router.get('/:id', validateGetCarsTypebyId, getCarsTypebyId);
router.post("/", validateCreateCarsType, createCarsType);
router.put("/:id", validateUpdateCarsType, updateCarsType);
router.delete("/:id", validateDeleteCarsTypebyId, deleteCarsTypebyId);

module.exports = router;