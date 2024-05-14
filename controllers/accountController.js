/* ***********************************
 * Account controller
 * deliver login view activity
 * ******************************** */
const utilities = require("../utilities");

/* ***********************************
 * Deliver login view
 * deliver login view activity
 * ******************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav();
  res.render("account/login", {
    title: "Login",
    nav,
  });
}

/* ***********************************
 * Deliver registration view
 * deliver register view activity
 * ******************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav();
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  });
}

module.exports = { buildLogin, buildRegister };
