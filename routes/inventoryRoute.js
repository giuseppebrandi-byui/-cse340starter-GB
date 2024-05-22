// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const invVehicle = require("../controllers/vehicleController");
const utilities = require("../utilities");
const validate = require("../utilities/classification-validation");
const classificationController = require("../controllers/classificationController");
const classificationControllerC = require("../controllers/classificationControllerC");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Route to build car model details view
router.get("/detail/:carModelId", invVehicle.buildSingleVehicle);
// Route to add classification
router.get("/add-classification", classificationController.addClassification);
// Route
router.post(
  "/add-classification",
  validate.classificationRules(),
  validate.checkClassifData,
  utilities.handleErrors(classificationControllerC.insertClassification)
);
// Route to vehicles management
router.get("/", classificationController.displayVehicleManagement);

// Route to inventory
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
);

module.exports = router;
