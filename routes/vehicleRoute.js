// Needed Resources
const express = require("express");
const router = new express.Router();
const invVehicle = require("../controllers/vehicleController");

// Route to build car model details view
router.get("/carModel/:carModelId", invVehicle.buildSingleVehicle); // TODO

module.exports = router;
