const express = require('express');
const { 
    validateGetAllCars,
    validateGetCarbyId, 
    validateCreateCar, 
    validateUpdateCar, 
    validateDeleteCarbyId
} = require('../middlewares/cars');
const { 
    getAllCars,
    getCarbyId, 
    createCar, 
    updateCar, 
    deleteCarbyId 
} = require('../controllers/cars');
const router = express.Router();

router.get("/", validateGetAllCars, getAllCars);
router.post("/", validateCreateCar, createCar);
router.get('/:id', validateGetCarbyId, getCarbyId);
router.put("/:id", validateUpdateCar, updateCar);
router.delete("/:id", validateDeleteCarbyId, deleteCarbyId);

module.exports = router;