const express = require('express');
const { 
    validateGetCars,
    validateGetCarbyId, 
    validateCreateCar, 
    validateUpdateCar, 
    validateDeleteCarbyId
} = require('../middlewares/cars');
const { 
    getCars,
    getCarbyId, 
    createCar, 
    updateCar, 
    deleteCarbyId 
} = require('../controllers/cars');
const router = express.Router();

router.get("/", validateGetCars, getCars);
router.post("/", validateCreateCar, createCar);
router.get('/:id', validateGetCarbyId, getCarbyId);
router.put("/:id", validateUpdateCar, updateCar);
router.delete("/:id", validateDeleteCarbyId, deleteCarbyId);

module.exports = router;