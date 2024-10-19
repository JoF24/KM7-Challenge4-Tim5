const modelsService = require("../services/carsModel");
const { validationResult } = require("express-validator");

exports.getModelById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const model = await modelsService.getModelById(id);
        return res.status(200).json(model);
    } catch (error) {
        next(error);
    }
};

exports.createModel = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const modelData = req.body;
        const newModel = await modelsService.createModel(modelData);
        return res.status(201).json(newModel);
    } catch (error) {
        next(error);
    }
};

exports.updateModel = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const modelData = req.body;

        const updatedModel = await modelsService.updateModel(id, modelData);
        return res.status(200).json(updatedModel);
    } catch (error) {
        next(error);
    }
};

exports.deleteModelById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        await modelsService.deleteModelById(id);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};
