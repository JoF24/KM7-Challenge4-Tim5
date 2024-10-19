const modelsRepository = require("../repositories/carsModel");
const {
    NotFoundError,
    InternalServerError,
} = require("../utils/request");

exports.getModelById = async (id) => {
    const model = await modelsRepository.getModelById(id);
    if (!model) {
        throw new NotFoundError("Model is Not Found!");
    }
    return model;
};

exports.createModel = async (data) => {
    try {
        return await modelsRepository.createModel(data);
    } catch (error) {
        throw new InternalServerError("Failed to create Model!");
    }
};

exports.updateModel = async (id, data) => {
    const existingModel = await modelsRepository.getModelById(id);
    if (!existingModel) {
        throw new NotFoundError("Model is Not Found!");
    }

    data = {
        ...existingModel,
        ...data,
    };

    const updatedModel = await modelsRepository.updateModel(id, data);
    if (!updatedModel) {
        throw new InternalServerError("Failed to update Model!");
    }

    return updatedModel;
};

exports.deleteModelById = async (id) => {
    const existingModel = await modelsRepository.getModelById(id);
    if (!existingModel) {
        throw new NotFoundError("Model is Not Found!");
    }

    const deletedModel = await modelsRepository.deleteModelById(id);
    if (!deletedModel) {
        throw new InternalServerError("Failed to delete Model!");
    }

    return deletedModel;
};
