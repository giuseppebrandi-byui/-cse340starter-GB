const vehicleModel = require("../models/vehicle-model");
const utilities = require("../utilities/");

const vehicleCont = {};

/* ***************************
 *  Build vehicle details
 * ************************** */
vehicleCont.buildSingleVehicle = async function (req, res, next) {
  const inv_id = req.params.carModelId;
  // const data = await vehicleModel.getvehicleById(inv_id);
  // const grid = await utilities.buildClassificationGrid(data);
  // let nav = await utilities.getNav();
  // const className = data[0].classification_name;
  res.render("./vehicle/vehicle", {
    title: " vehicles",
    nav,
    // grid,
  });
};

module.exports = vehicleCont;
