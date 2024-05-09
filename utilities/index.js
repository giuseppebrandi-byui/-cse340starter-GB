const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  // console.log(data);
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
  let grid;
  grid = '<div id="inv-display" class="grid grid--2-cols grid--3-cols">';
  grid += "<div class='vehicle-card'>";
  grid +=
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
  grid += "</div>";
  return grid;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;
