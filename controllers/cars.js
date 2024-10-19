const carsService = require("../services/cars");
const { validationResult } = require("express-validator");

// Controller for getting a car by ID
exports.getCarById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const car = await carsService.getCarById(id);
        return res.status(200).json(car);
    } catch (error) {
        next(error);
    }
};

// Controller for creating a new car
exports.createCar = async (req, res, next) => {
    try {
        // Handling validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const carData = req.body;
        const newCar = await carsService.createCar(carData);
        return res.status(201).json(newCar);
    } catch (error) {
        next(error);
    }
};

// Controller for updating a car by ID
exports.updateCar = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const carData = req.body;

        const updatedCar = await carsService.updateCar(id, carData);
        return res.status(200).json(updatedCar);
    } catch (error) {
        next(error);
    }
};

// Controller for deleting a car by ID
exports.deleteCarById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        await carsService.deleteCarById(id);
        return res.status(204).send(); // 204 No Content for successful deletion
    } catch (error) {
        next(error);
    }
};
