const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const { NotFoundError } = require("../utils/request");

const prisma = new PrismaClient();

exports.getCarById = async (id) => {
    const searchedCarById = await prisma.cars.findUnique({
        where: {
            id: id,
        }
    });

    if (!searchedCarById) {
        throw new NotFoundError("Car not found in the database!");
    }

    const serializedCar = JSONBigInt.stringify(searchedCarById);
    return JSONBigInt.parse(serializedCar);
};

exports.createCar = async (data) => {
    const largestIdCar = await prisma.cars.findFirst({
        select: {
            id: true,
        },
    });

    const newId = largestIdCar ? BigInt(largestIdCar.id) + BigInt(1) : BigInt(1);

    const newCarData = {
        ...data,
        id: newId.toString(),
    };

    const newCar = await prisma.cars.create({
        data: newCarData,
    });

    const serializedCar = JSONBigInt.stringify(newCar);
    return JSONBigInt.parse(serializedCar);
};

exports.updateCar = async (id, data) => {
    const existingCar = await prisma.cars.findFirst({
        where: { 
            id: id,
        },
    });

    if (!existingCar) {
        throw new NotFoundError("Car not found in the database!");
    }

    const updatedData = {
        plate: data.plate || existingCar.plate,
        manufacture_id: data.manufacture_id || existingCar.manufacture_id,
        model_id: data.model_id || existingCar.model_id,
        image: data.image || existingCar.image,
        rentPerDay: data.rentPerDay || existingCar.rentPerDay,
        capacity: data.capacity || existingCar.capacity,
        description: data.description || existingCar.description,
        availableAt: data.availableAt || existingCar.availableAt,
        transmission_id: data.transmission_id || existingCar.transmission_id,
        available: data.available !== undefined ? data.available : existingCar.available,
        type_id: data.type_id || existingCar.type_id,
        year: data.year || existingCar.year,
        options: data.options || existingCar.options,
        specs: data.specs || existingCar.specs,
        fuel_id: data.fuel_id || existingCar.fuel_id,
    };

    const updatedCar = await prisma.cars.update({
        where: { 
            id: id,
        },
        data: updatedData,
    });

    const serializedCar = JSONBigInt.stringify(updatedCar);
    return JSONBigInt.parse(serializedCar);
};

exports.deleteCarById = async (id) => {
    const existingCar = await prisma.cars.findFirst({
        where: { 
            id: id, 
        },
    });

    if (!existingCar) {
        throw new NotFoundError("Car not found in the database!");
    }

    const deletedCar = await prisma.cars.delete({
        where: { 
            id: id, 
        },
    });

    const serializedCar = JSONBigInt.stringify(deletedCar);
    return JSONBigInt.parse(serializedCar);
};
