const invModel = require("../models/inventory-model");
const Util = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* ********************************************
 * Constructs the select element drop-down list
 ******************************************** */
// Util.getSelectEl = async function (req, res, next) {
//   let data = await invModel.getClassifications();
//   let dropdown = "<select>";
//   data.rows.forEach((row) => {
//     dropdown += "<option value='row.classification_id'>";
//     dropdown +=
//       '<a href="/inv/type/' +
//       row.classification_id +
//       row.classification_name +
//       "</a>";
//     dropdown += "</option>";
//   });
//   dropdown += "</select>";
//   return dropdown;
// };

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<div id="inv-display" class="grid grid--2-cols grid--3-cols">';
    data.forEach((vehicle) => {
      grid += "<div class='vehicle-card'>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        'details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += "<hr />";
      grid += "<h2>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        "<span class='vehiclePrice'>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>";
      grid += "</div>";
      grid += "</div>";
    });
    grid += "</div>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

/* **************************************
 * Build the chosen vehicle view HTML
 * ************************************ */
Util.buildSingleVehiclePage = async function (vehicle) {
  let carDetailsGrid;
  carDetailsGrid = "<h2>";
  carDetailsGrid += vehicle.inv_make + " " + vehicle.inv_model;
  carDetailsGrid += "</h2>";

  carDetailsGrid += '<div id="inv-display" class="grid grid--2-cols">';

  carDetailsGrid += "<div>";
  carDetailsGrid +=
    '<a href="../../inv/detail/' +
    vehicle.inv_id +
    '" title="View ' +
    vehicle.inv_make +
    " " +
    vehicle.inv_model +
    'details"><img src="' +
    vehicle.inv_image +
    '" alt="Image of ' +
    vehicle.inv_make +
    " " +
    vehicle.inv_model +
    ' on CSE Motors" /></a>';
  carDetailsGrid += "</div>";

  carDetailsGrid += "<div>"; // Open div details section
  carDetailsGrid += "<div class='prominent'>"; // Open div prominent section
  carDetailsGrid += "<h3>";
  carDetailsGrid +=
    " " + vehicle.inv_year + "  " + vehicle.inv_make + " " + vehicle.inv_model;
  carDetailsGrid += "</h3>";

  carDetailsGrid += "<h3>";
  carDetailsGrid +=
    "$" + new Intl.NumberFormat("en-US").format(vehicle.inv_price);
  carDetailsGrid += "</h3>";
  carDetailsGrid += "</div>"; // Close div prominent section

  carDetailsGrid += "<div>"; // Open div more details section
  carDetailsGrid += "<p>";
  carDetailsGrid +=
    "<span class='label'>Mileage:</span> " + vehicle.inv_miles.toLocaleString();
  carDetailsGrid += "</p>";

  carDetailsGrid += "<p>";
  carDetailsGrid += "<span class='label'>Color:</span> " + vehicle.inv_color;
  carDetailsGrid += "</p>";

  carDetailsGrid += "<p>";
  carDetailsGrid +=
    "<span class='label'>Description:</span> " + vehicle.inv_description;
  carDetailsGrid += "</p>";

  carDetailsGrid += "</div>"; // Close div more details section

  carDetailsGrid += "</div>"; // Close grid
  return carDetailsGrid;
};

/* ************************
 * Constructs the management links
 ************************** */
Util.buildManagementLink = async function (links) {
  let linkMgt = "";
  links.forEach((link) => {
    linkMgt += `<a href="${link.url}">${link.name}</a><br/>`;
  });
  return linkMgt;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/* ****************************************
 * Middleware to check token validity
 **************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, accountData) {
        if (err) {
          req.flash("Please log in");
          res.clearCookie("jwt");
          return res.redirect("/account/login");
        }
        res.locals.accountData = accountData;
        res.locals.loggedin = 1;
        next();
      }
    );
  } else {
    next();
  }
};

/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next();
  } else {
    req.flash("notice", "Please log in.");
    return res.redirect("/account/login");
  }
};

Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications();
  let classificationList =
    '<select name="classification_id" id="classificationList" required>';
  classificationList += "<option value=''>Choose a Classification</option>";
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"';
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected ";
    }
    classificationList += ">" + row.classification_name + "</option>";
  });
  classificationList += "</select>";
  return classificationList;
};

module.exports = Util;
