/* ***********************************
 * Account routes
 * deliver login view activity
 * ******************************** */
// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");
const regValidate = require("../utilities/account-validation");

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
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Process Login
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  (req, res) => {
    res.status(200).send("login process");
  }
);

module.exports = router;
