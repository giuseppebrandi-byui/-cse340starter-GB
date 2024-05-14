/* ***********************************
 * Account routes
 * deliver login view activity
 * ******************************** */
// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");

/* ***********************************
 * Deliver Login View
 * deliver login view activity
 * ******************************** */
router.get("/login", utilities.handleErrors(accountController.buildLogin));

/* ***********************************
 * Deliver Registration View
 * deliver registration view activity
 * ******************************** */
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);

/* ***********************************
 * Process Registration
 * process registration activity
 * ******************************** */
router.post(
  "/register",
  utilities.handleErrors(accountController.registerAccount)
);

module.exports = router;
