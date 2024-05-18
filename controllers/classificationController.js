const utilities = require("../utilities/");
const classificationCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
classificationCont.displayVehicleManagement = async function (req, res, next) {
  let nav = await utilities.getNav();
  const links = [
    {
      url: "/inv/add-classification",
      name: "Add new classification",
    },
    {
      url: "/inv/add-inventory",
      name: "Add new inventory",
    },
  ];
  const managmentLinks = await utilities.buildManagementLink(links);
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    managmentLinks,
  });
};

classificationCont.addClassification = async function (req, res, next) {
  const newForm = await utilities.buildClassificationForm(res.locals);
  let nav = await utilities.getNav();
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    newForm,
  });
};

module.exports = classificationCont;
