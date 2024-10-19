const express = require('express');
const { 
    validateGetModelById, 
    validateCreateModel, 
    validateUpdateModel, 
    validateDeleteModelById, 
    checkModelExists, 
    errorHandler 
} = require('./middlewares/models');
const { getModelById, createModel, updateModel, deleteModelById } = require('../controllers/modelsController');
const router = express.Router();

router.get('/models/:id', validateGetModelById, checkModelExists, async (req, res, next) => {
    try {
        const model = await getModelById(req, res, next);
        res.json(model);
    } catch (err) {
        next(err);
    }
});

router.post('/models', validateCreateModel, async (req, res, next) => {
    try {
        const newModel = await createModel(req, res, next);
        res.status(201).json(newModel);
    } catch (err) {
        next(err);
    }
});

router.put('/models/:id', validateUpdateModel, checkModelExists, async (req, res, next) => {
    try {
        const updatedModel = await updateModel(req, res, next);
        res.json(updatedModel);
    } catch (err) {
        next(err);
    }
});

router.delete('/models/:id', validateDeleteModelById, checkModelExists, async (req, res, next) => {
    try {
        await deleteModelById(req, res, next);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

router.use(errorHandler);

module.exports = router;
