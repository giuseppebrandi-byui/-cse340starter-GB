// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const invVehicle = require("../controllers/vehicleController");
const utilities = require("../utilities");
const regValidate = require("../utilities/account-validation");
const classificationController = require("../controllers/classificationController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Route to build car model details view
router.get("/detail/:carModelId", invVehicle.buildSingleVehicle);
// Route to add classification
router.get("/add-classification", classificationController.addClassification);
// Route
router.post("/add-classification", regValidate.classificationValidate());
// Route to vehicles management
router.get("/", classificationController.displayVehicleManagement);
module.exports = router;
