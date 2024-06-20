const { textField, itemsField } = require("../utils/fields");
const { validationMiddleware } = require("../utils/middlewares");
const { Permission } = require("../permissions/models");

const roleValidationCreate = validationMiddleware([
  textField("name"),
  itemsField("accessList", 1).custom(async (values) => {
    const data = await Permission.find({
      access: { $in: values },
    });
    if (data.length !== values.length) {
      throw new Error("Some permission not available on system.");
    }

    return data;
  }),
]);

const roleValidationUpdate = roleValidationCreate;

module.exports = {
  roleValidationCreate,
  roleValidationUpdate,
};
