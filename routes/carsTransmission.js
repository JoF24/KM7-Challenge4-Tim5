const express = require("express");
const {
    validateGetCarsTransmission,
    validateCreateCarsTransmission,
    validateGetCarsTransmissionbyId,
    validateUpdateCarsTransmission,
    validateDeleteCarsTransmissionbyId,
} = require("../middlewares/carsTransmission");
const {
    getCarsTransmission,
    createCarsTransmission,
    getCarsTransmissionbyId,
    updateCarsTransmission,
    deleteCarsTransmissionbyId,
} = require("../controllers/carsTransmission");
const router = express.Router();

router.get("/", validateGetCarsTransmission, getCarsTransmission);
router.post("/", validateCreateCarsTransmission, createCarsTransmission);
router.get('/:id', validateGetCarsTransmissionbyId, getCarsTransmissionbyId);
router.put("/:id", validateUpdateCarsTransmission, updateCarsTransmission);
router.delete("/:id", validateDeleteCarsTransmissionbyId, deleteCarsTransmissionbyId);

module.exports = router;
