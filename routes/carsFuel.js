const express = require("express");
const {
    validateGetCarsFuel,
    validateCreateCarsFuel,
    validateGetCarsFuelbyId,
    validateUpdateCarsFuel,
    validateDeleteCarsFuelbyId,
} = require("../middlewares/carsFuel");
const {
    getCarsFuel,
    createCarsFuel,
    getCarsFuelbyId,
    updateCarsFuel,
    deleteCarsFuelbyId,
} = require("../controllers/carsFuel");
const router = express.Router();

router.get("/", validateGetCarsFuel, getCarsFuel);
router.post("/", validateCreateCarsFuel, createCarsFuel);
router.get('/:id', validateGetCarsFuelbyId, getCarsFuelbyId);
router.put("/:id", validateUpdateCarsFuel, updateCarsFuel);
router.delete("/:id", validateDeleteCarsFuelbyId, deleteCarsFuelbyId);

module.exports = router;
