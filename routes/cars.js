const express = require('express');
const { validateGetCarbyId, validateCreateCar, validateUpdateCar, validateDeleteCarbyId, checkCarExists, errorHandler } = require('../middlewares/cars');
const { getCarById, createCar, updateCar, deleteCarById } = require('../controllers/cars');
const router = express.Router();

router.get('/:id', validateGetCarbyId, checkCarExists, async (req, res, next) => {
    try {
        const car = await getCarById(req.params.id);
        res.json(car);
    } catch (err) {
        next(err);
    }
});

router.post('/', validateCreateCar, async (req, res, next) => {
    try {
        const newCar = await createCar(req.body);
        res.status(201).json(newCar);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', validateUpdateCar, checkCarExists, async (req, res, next) => {
    try {
        const updatedCar = await updateCar(req.params.id, req.body);
        res.json(updatedCar);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', validateDeleteCarbyId, checkCarExists, async (req, res, next) => {
    try {
        await deleteCarById(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

router.use(errorHandler);

module.exports = router;
