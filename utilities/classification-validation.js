// const utilities = require(".");
// const { body, validationResult } = require("express-validator");
// const classificationModel = require("../models/classification-model");
// const validate = {};

// /*  **********************************
//  *  Classification validation rules
//  * ********************************* */
// validate.classificationRules = () => {
//   return [
//     // valid classification is required and cannot already exist in the DB
//     body("classification_name")
//       .trim()
//       .notEmpty()
//       .escape()
//       .isLength({ min: 2 })
//       .withMessage("A valid classification name is required.")
//       .custom(async (classification_name) => {
//         // TO DO Create a new validation file
//         // Move function classificationRules
//         // Create a check function inside inventory model
//         // Call the new check function here:
//         const classificationName =
//           await classificationModel.checkExistingClassification(
//             classification_name
//           );
//         if (classification_name) {
//           throw new Error(
//             "Classification name exists. Please log in or use different email"
//           );
//         }
//       }),
//   ];
// };

// module.exports = validate;
