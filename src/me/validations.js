const { validationMiddleware } = require("../utils/middlewares");
const { textField } = require("../utils/fields");

const meUpdateValidationBody = validationMiddleware([
  textField("firstName", true),
  textField("lastName", true),
]);

module.exports = {
  meUpdateValidationBody,
};
