const { body } = require("express-validator");
const { validationMiddleware } = require("../../utils/middlewares");
const { textField } = require("../../utils/fields");

validationMiddleware;

const meUpdateValidationBody = validationMiddleware([
  textField("firstName", true),
  textField("lastName", true),
]);

module.exports = {
  meUpdateValidationBody,
};
