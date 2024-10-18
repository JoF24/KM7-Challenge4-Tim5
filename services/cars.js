const carsRepository = require("../repositories/cars");
const {imageUpload} = require("../utils/image-kit");
const {
    NotFoundError, 
    InternalServerError,
} = require("../utils/request");

exports.createCars = async (data, file) => {
    if(file?.image){
        data.image = await imageUpload(file.image)
    }       
    return carsRepository.createCars(data);
};
