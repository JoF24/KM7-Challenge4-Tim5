const carsService = require("../services/cars");
const { successResponse } = require("../utils/response");

exports.getCarsbyId = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsService.getCarsbyId(id);
    successResponse(res, data);
};

exports.getCars = async (req, res, next) => {
    const data = await carsService.getAllCars();
    successResponse(res, data);
};

exports.createCars = async (req, res, next) => {
    const data = await carsService.createCars(req.body, req.files);
    successResponse(res, data);
};

exports.updateCars = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsService.updateCars(id, req.body, req.files);
    successResponse(res, data);
};

exports.deleteCarsbyId = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsService.deleteCarsbyId(id);
    successResponse(res, data);
};
