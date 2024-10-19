const { z } = require('zod');
const { getModelById } = require('../controllers/modelsController');
const { NotFoundError } = require('../utils/request');

const modelIdSchema = z.number({
    required_error: "Model ID is required",
    invalid_type_error: "Model ID must be a number"
}).positive().int();

const modelCreateSchema = z.object({
    type: z.string().min(1, "Type is required").max(50, "Type must not exceed 50 characters"),
    year: z.number({ required_error: "Year is required" }).int().min(1886, "Year must be greater than 1886")
});

const modelUpdateSchema = modelCreateSchema.partial();

exports.validateGetModelById = (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        modelIdSchema.parse(id); // Parse and validate the ID for getting model
        next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};

exports.validateCreateModel = (req, res, next) => {
    try {
        modelCreateSchema.parse(req.body); // Parse and validate the request body for model creation
        next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};

exports.validateUpdateModel = (req, res, next) => {
    try {
        modelUpdateSchema.parse(req.body); // Parse and validate the request body for model update
        next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};

exports.validateDeleteModelById = (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        modelIdSchema.parse(id);
        next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};

// Middleware for checking if Model exists
exports.checkModelExists = async (req, res, next) => {
    const modelId = parseInt(req.params.id);
    try {
        const model = await getModelById(req, res, next);
        if (!model) {
            throw new NotFoundError("Model not found");
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
