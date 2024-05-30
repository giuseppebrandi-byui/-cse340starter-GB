/* ***********************************
 * Inquiry controller
 * ******************************** */
const utilities = require("../utilities");
const accountModel = require("../models/account-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


/* ****************************************
 *  Process Inquiry
 * *************************************** */
async function registerInquiry(req, res) {
  let nav = await utilities.getNav();
  const {
    inquiry_firstname,
    inquiry_lastname,
    inquiry_email,
    inquiry_message,
  } = req.body;

  const regInquiry = await accountModel.registerInquiry(
    inquiry_firstname,
    inquiry_lastname,
    inquiry_email,
    inquiry_message,
  );

  if (regInquiry) {
    req.flash(
      "notice",
      `Great, ${inquiry_firstname}, Your inquiry has been sent. A member of the team will contact you in the next 24 hours.`
    );
    res.status(201).render("inv/detail", {
      title: "Inquiry",
      nav,
      errors: null,
    });
  } else {
    req.flash("notice", "Sorry, your inquiry submission failed.");
    res.status(501).render("inv/detail", {
      title: "Inquiry",
      nav,
      errors: null,
    });
  }
}

module.exports = {
  registerInquiry,
};