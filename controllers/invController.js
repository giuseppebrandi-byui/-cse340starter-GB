const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
// invCont.displayVehicleManagement = async function (req, res, next) {
//   let nav = await utilities.getNav();
//   const links = [
//     {
//       url: "/inv/add-classification",
//       name: "Add new classification",
//     },
//     {
//       url: "/inv/add-inventory",
//       name: "Add new inventory",
//     },
//   ];
//   const managmentLinks = await utilities.buildManagementLink(links);
//   res.render("./inventory/management", {
//     title: "Vehicle Management",
//     nav,
//     managmentLinks,
//   });
// };

// invCont.addClassification = async function (req, res, next) {
//   const newForm = await utilities.buildClassificationForm(res.locals);
//   let nav = await utilities.getNav();
//   res.render("./inventory/add-classification", {
//     title: "Add New Classification",
//     nav,
//     newForm,
//   });
// };

module.exports = invCont;
