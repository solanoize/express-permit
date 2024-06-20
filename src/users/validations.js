const bcrypt = require("bcryptjs");
const { validationMiddleware } = require("../utils/middlewares");
const { Role } = require("../roles/models");
const { User } = require("./models");
const {
  textField,
  emailField,
  passwordField,
  booleanField,
  objectIDField,
} = require("../utils/fields");

const userValidationCreate = validationMiddleware([
  textField("firstName"),
  textField("lastName"),
  emailField("email").custom(async (value) => {
    const data = await User.findOne({ email: value });
    if (data) {
      throw new Error("Email has been registered");
    }
  }),
  passwordField("password").customSanitizer(async (value) => {
    return await bcrypt.hash(value, 10);
  }),
  booleanField("isActive"),
  objectIDField("role").custom(async (value) => {
    const data = await Role.findOne({ _id: value });
    if (!data) {
      throw new Error("Role not available in system");
    }
  }),
]);

const userValidationUpdate = validationMiddleware([
  textField("firstName"),
  textField("lastName"),
  booleanField("isActive"),
  objectIDField("role").custom(async (value) => {
    const data = await Role.findOne({ _id: value });
    if (!data) {
      throw new Error("Role not available in system");
    }
  }),
]);

const userValidationSignIn = validationMiddleware([
  emailField("email").custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (!user) {
      return Promise.reject("Email not registered");
    }

    if (user.isDelete) {
      return Promise.reject("User is deleted in this system");
    }

    if (!user.isActive) {
      return Promise.reject("User not active in this system");
    }

    return true;
  }),
  passwordField("password").custom(async (value, { req }) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!(await bcrypt.compare(value, user.password))) {
        return Promise.reject("Invalid password");
      }
    } catch (error) {
      throw new Error("Invalid password");
    }
  }),
]);

module.exports = {
  userValidationCreate,
  userValidationUpdate,
  userValidationSignIn,
};
