// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const invVehicle = require("../controllers/vehicleController");
const utilities = require("../utilities");
const validate = require("../utilities/classification-validation");
const inventoryValidate = require("../utilities/addinventory-validation");
const classificationController = require("../controllers/classificationController");
const classificationControllerC = require("../controllers/classificationControllerC");
const selectController = require("../controllers/selectController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Route to build car model details view
router.get("/detail/:carModelId", invVehicle.buildSingleVehicle);
// Route to add classification
router.get("/add-classification", classificationController.addClassification);
// Route to add inventory
router.get("/add-inventory", selectController.buildDropdown);

// Route to classification
router.post(
  "/add-classification",
  validate.classificationRules(),
  validate.checkClassifData,
  utilities.handleErrors(classificationControllerC.insertClassification)
);

// Route to add inventory
router.post(
  "/add-inventory",
  inventoryValidate.addInventoryRules(),
  inventoryValidate.checkInventoryData,
  utilities.handleErrors(selectController.insertInventory)
);

// Route to vehicles management
// router.get("/", classificationController.displayVehicleManagement);

// Route to account management view
router.get("/", utilities.handleErrors(invController.buildManagementView));

// Route to inventory
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
);

// Route to inventory management
router.get(
  "inv/edit/:inventory_id",
  utilities.handleErrors(invController.editInventoryView)
);

module.exports = router;
