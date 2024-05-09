const vehicleModel = require("../models/vehicle-model");
const utilities = require("../utilities/");

const vehicleCont = {};

/* ***************************
 *  Build vehicle details
 * ************************** */
vehicleCont.buildSingleVehicle = async function (req, res, next) {
  const inv_id = req.params.carModelId;
  console.log("Inv ID: ", inv_id);
  const data = await vehicleModel.getvehicleById(inv_id);
  // console.log(data);
  const grid = await utilities.buildSingleVehiclePage(data);
  let nav = await utilities.getNav();
  // const className = data[0].classification_name;
  res.render("./inventory/vehicle", {
    title: " vehicles",
    nav,
    grid,
  });
};

module.exports = vehicleCont;
