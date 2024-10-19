const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const { NotFoundError } = require("../utils/request");

const prisma = new PrismaClient();

exports.getModelById = async (id) => {
    const searchedModelById = await prisma.model.findUnique({
        where: {
            id: id,
        },
    });

    if (!searchedModelById) {
        throw new NotFoundError("Model not found in the database!");
    }

    const serializedModel = JSONBigInt.stringify(searchedModelById);
    return JSONBigInt.parse(serializedModel);
};

exports.createModel = async (data) => {
    const largestIdModel = await prisma.model.findFirst({
        select: {
            id: true,
        },
        orderBy: {
            id: 'desc',
        },
    });

    const newId = largestIdModel ? BigInt(largestIdModel.id) + BigInt(1) : BigInt(1);

    const newModelData = {
        ...data,
        id: newId.toString(),
    };

    const newModel = await prisma.model.create({
        data: newModelData,
    });

    const serializedModel = JSONBigInt.stringify(newModel);
    return JSONBigInt.parse(serializedModel);
};

exports.updateModel = async (id, data) => {
    const existingModel = await prisma.model.findFirst({
        where: { 
            id: id,
        },
    });

    if (!existingModel) {
        throw new NotFoundError("Model not found in the database!");
    }

    const updatedData = {
        type: data.type || existingModel.type,
        year: data.year || existingModel.year,
    };

    const updatedModel = await prisma.model.update({
        where: { 
            id: id,
        },
        data: updatedData,
    });

    const serializedModel = JSONBigInt.stringify(updatedModel);
    return JSONBigInt.parse(serializedModel);
};

exports.deleteModelById = async (id) => {
    const existingModel = await prisma.model.findFirst({
        where: { 
            id: id, 
        },
    });

    if (!existingModel) {
        throw new NotFoundError("Model not found in the database!");
    }

    const deletedModel = await prisma.model.delete({
        where: { 
            id: id, 
        },
    });

    const serializedModel = JSONBigInt.stringify(deletedModel);
    return JSONBigInt.parse(serializedModel);
};
