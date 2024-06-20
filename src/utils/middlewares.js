const { matchedData, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { logger } = require("./helpers");
const { Error401, exceptionHandler, Error403 } = require("./errors");
const { User } = require("../apps/users/models");
const { Role } = require("../apps/roles/models");
const { Permission } = require("../apps/permissions/models");

const validationMiddleware = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      res.locals.matchedData = matchedData(req);
      return next();
    }

    const error = {
      ..._.groupBy(errors.array(), (item) => item.path),
      isValid: false,
    };

    return res.status(400).json(error);
  };
};

const jwtAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      logger.error("Token is required for authentication");
      throw new Error401("Token is required for authentication");
    }

    const decode = jwt.verify(token, process.env.API_TOKEN);
    const user = await User.findOne({ email: decode.email }, "-password");
    const role = await Role.findOne({ _id: user.role });

    if (!user) {
      logger.error("Invalid user credentials");
      throw new Error401("Invalid user credentials");
    }

    if (!user.isSuperuser && !role) {
      logger.error("User has not role or role not available on system");
      throw new Error401("User has not role or role not available on system");
    }

    if (!user.isActive) {
      logger.error("Your account is inactive");
      throw new Error401("Your account is inactive");
    }

    res.locals.user = user;
    res.locals.role = role;
  } catch (error) {
    console.log(error.name);
    return exceptionHandler(error, res);
  }

  return next();
};

const hasPermissionsMiddleware = (permissions = []) => {
  return async (req, res, next) => {
    try {
      if (res.locals.user.isSuperuser) {
        return next();
      }

      const totalAccess = await Permission.countDocuments({
        access: { $in: permissions },
      });

      if (totalAccess !== permissions.length) {
        throw new Error403("Access is not owned by the system");
      }

      const { role } = res.locals;

      if (!role) {
        throw new Error403(
          `Permission denied, you don't have role for accessing resource.`
        );
      }

      const roleSet = new Set(role.accessList);

      for (let p of permissions) {
        const [, model] = p.split("-");
        if (roleSet.has(`update-${model}`) || roleSet.has(`delete-${model}`)) {
          roleSet.add(`read-${model}`);
        }
      }

      for (let p of permissions) {
        if (!roleSet.has(p)) {
          const [action, model] = p.split("-");
          logger.error(
            "Permission denied, you are not allowed to access this resource."
          );
          throw new Error403(
            `Permission denied, you are not allowed to access ${action.toUpperCase()} ${model.toUpperCase()}.`
          );
        }
      }

      return next();
    } catch (error) {
      return exceptionHandler(error, res);
    }
  };
};



module.exports = {
  validationMiddleware,
  jwtAuthMiddleware,
  hasPermissionsMiddleware
};
