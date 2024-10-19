const { z } = require('zod');
const { getCarById } = require('./cars');
const { NotFoundError } = require('../utils/request');

const carIdSchema = z.number({
    required_error: "Car ID is required",
    invalid_type_error: "Car ID must be a number"
}).positive().int();

const carCreateSchema = z.object({
    plate: z.string().min(1, "Plate is required").max(20, "Plate must not exceed 20 characters"),
    rentPerDay: z.number({ required_error: "Rent per day is required" }).positive("Rent per day must be a positive number"),
    capacity: z.number({ required_error: "Capacity is required" }).positive("Capacity must be a positive number"),
    availableAt: z.string({ required_error: "AvailableAt is required" }).refine((date) => !isNaN(Date.parse(date)), "AvailableAt must be a valid date"),
    available: z.boolean({ required_error: "Available status is required" }),
    year: z.number({ required_error: "Year is required" }).int().min(1886, "Year must be greater than 1886"),
    manufacture_id: z.bigint().optional(),
    model_id: z.bigint().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    transmission_id: z.bigint().optional(),
    type_id: z.bigint().optional(),
    options: z.any().optional(),
    specs: z.any().optional(),
    fuel_id: z.bigint().optional()
});

const carUpdateSchema = carCreateSchema.partial();

exports.validateGetCarbyId = (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        carIdSchema.parse(id); // Parse and validate the ID for getting car
        next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};

exports.validateCreateCar = (req, res, next) => {
    try {
        carCreateSchema.parse(req.body); // Parse and validate the request body for car creation
        next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};

exports.validateUpdateCar = (req, res, next) => {
    try {
        carUpdateSchema.parse(req.body); // Parse and validate the request body for car update
        next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};

exports.validateDeleteCarbyId = (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        carIdSchema.parse(id); // Parse and validate the ID for car deletion
        next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};

exports.checkCarExists = async (req, res, next) => {
    const carId = parseInt(req.params.id);
    try {
        const car = await getCarById(carId);
        if (!car) {
            throw new NotFoundError("Car not found");
        }
        next();
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

exports.errorHandler = (err, req, res, next) => {
    if (err.name === 'NotFoundError') {
        return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: 'An unexpected error occurred' });
};
