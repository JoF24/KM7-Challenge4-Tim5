const { z } = require('zod');
const { NotFoundError } = require('../utils/request');

exports.validateGetCarsbyId = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });
    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    } 
    next();
};

exports.validateCreateCars = (req, res, next) => {
    req.body ={
        ...req.body,
        rentPerDay : parseInt(req.body.rentPerDay),
        capacity : parseInt(req.body.capacity),
        available : req.body.available === 'true',
        year : parseInt(req.body.year),
        options : JSON.parse(req.body.options),
        specs : JSON.parse(req.body.specs),
    }

    const validateBody = z.object({
        plate : z.string(),
        manufacture_id : z.string(),
        model_id : z.string(),
        rentPerDay : z.number(),
        capacity : z.number(),
        description : z.string(),
        availableAt : z.string(),
        transmission_id : z.string(),
        available : z.boolean(),
        type_id : z.string(),
        year : z.number(),
        options : z.array(z.string()),
        specs : z.array(z.string()),
        fuel_id : z.string(),
    });

    const validateFileBody = z.object({
        image: z.object({
            name : z.string(),
            data : z.any(),
        }),
        .nullable()
        .optional(),
    });

    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    };

    const resultValidateFile = validateFileBody.safeParse(req.files);
    if (!resultValidateFile.success) {
        throw new BadRequestError(resultValidateFile.error.errors);
    };

    next();
};

exports.validateUpdateCar = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.errors);
    }

    req.body ={
        ...req.body,
        rentPerDay : parseInt(req.body.rentPerDay),
        capacity : parseInt(req.body.capacity),
        available : req.body.available === 'true',
        year : parseInt(req.body.year),
        options : JSON.parse(req.body.options),
        specs : JSON.parse(req.body.specs),
    }

    const validateBody = z.object({
        plate : z.string(),
        manufacture_id : z.string(),
        model_id : z.string(),
        rentPerDay : z.number(),
        capacity : z.number(),
        description : z.string(),
        availableAt : z.string(),
        transmission_id : z.string(),
        available : z.boolean(),
        type_id : z.string(),
        year : z.number(),
        options : z.array(z.string()),
        specs : z.array(z.string()),
        fuel_id : z.string(),
    });

    const validateFileBody = z.object({
        image: z.object({
            name : z.string(),
            data : z.any(),
        }),
        .nullable()
        .optional(),
    });

    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    };

    const resultValidateFile = validateFileBody.safeParse(req.files);
    if (!resultValidateFile.success) {
        throw new BadRequestError(resultValidateFile.error.errors);
    };

    next();
};

exports.validateDeleteCarsbyId = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    };
    next();
};