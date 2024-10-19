const carsRepository = require("../repositories/cars");
const {
    NotFoundError, 
    InternalServerError,
} = require("../utils/request");

exports.getCarById = async (id) => {
    const car = await carsRepository.getCarById(id);
    if (!car) {
        throw new NotFoundError("Car is Not Found!");
    }
    return car;
};

exports.createCar = async (data) => {
    try {
        return await carsRepository.createCar(data);
    } catch (error) {
        throw new InternalServerError("Failed to create Car!");
    }
};

exports.updateCar = async (id, data) => {
    const existingCar = await carsRepository.getCarById(id);
    if (!existingCar) {
        throw new NotFoundError("Car is Not Found!");
    }

    data = {
        ...existingCar,
        ...data,
    };

    const updatedCar = await carsRepository.updateCar(id, data);
    if (!updatedCar) {
        throw new InternalServerError("Failed to update Car!");
    }

    return updatedCar;
};

exports.deleteCarById = async (id) => {
    const existingCar = await carsRepository.getCarById(id);
    if (!existingCar) {
        throw new NotFoundError("Car is Not Found!");
    }

    const deletedCar = await carsRepository.deleteCarById(id);
    if (!deletedCar) {
        throw new InternalServerError("Failed to delete Car!");
    }

    return deletedCar;
};
