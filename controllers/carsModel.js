const carsFuelService = require("../services/carsModel");
const { successResponse } = require("../utils/response");

exports.getCarsModel = async (req, res, next) => {
    const data = await carsModelService.getCarsModel(
        req.query?.type
    );
    successResponse(res, data);
}

exports.getCarModelbyId = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsFuelService.getCarModelbyId(id);
    successResponse(res, data);
};

exports.createCarModel = async (req, res, next) => {
    const data = await carsModelService.createCarModel(req.body);
    successResponse(res, data);
};

exports.updateCarMode = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsModelService.updateCarModel(id, req.body);
    successResponse(res, data);
};

exports.deleteCarModelbyId = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsModelService.deleteCarModelbyId(id);
    successResponse(res, data);
};
