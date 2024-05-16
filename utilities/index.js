const invModel = require("../models/inventory-model");
const Util = {};

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

Util.buildClassificationForm = async function (locals) {
  let form = "";
  form += `<form
    id="addClassificationForm"
    action="/inventory/add-classification"
    method="post"
  >
    <fieldset>
      <legend>Add New Classification</legend>
      <p>Field is required.</p>
      <label class="top" for="classification"
        >Classification Name:
        <p>Name must be alphabetic characters only, no spaces.</p>
        <input
          type="text"
          id="classification"
          name="classification_name"
          required
          pattern="^[A-Za-z][A-Za-z]*$"
          value='${locals.classification_name ?? ""}'
      /></label>

      <input
        type="submit"
        value="Add Classification"
        class="submitClassificationBtn"
      />
    </fieldset>
  </form>`;
  return form;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;
