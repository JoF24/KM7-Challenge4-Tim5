const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const loadCars = () => {
    const dataBuffer = fs.readFileSync("./data/cars.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
};

const saveCars = (cars) => {
    const dataJSON = JSON.stringify(cars, null, 4);
    fs.writeFileSync("./data/cars.json", dataJSON);
};

exports.createCarsTable = () => {
    if (!fs.existsSync("./data/cars.json")) {
        saveCars([]);
        console.log("Cars data file created successfully");
    }
};

exports.createCar = (data) => {
    const cars = loadCars();
    const newCar = {
        id: uuidv4(),
        ...data
    };
    cars.push(newCar);
    saveCars(cars);
    return newCar;
};
