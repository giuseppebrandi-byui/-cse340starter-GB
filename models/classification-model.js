const pool = require("../database/");

/* ****************************************
 *   Check for existing classification name
 * ************************************* */
async function checkExistingClassification(classification_name) {
  try {
    const sql = "SELECT * FROM classification WHERE classification_name = $1";
    const classification = await pool.query(sql, [classification_name]);
    return classification.rowCount;
  } catch (error) {
    return error.message;
  }
}

module.exports = { checkExistingClassification };
