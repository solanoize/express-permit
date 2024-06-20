const express = require("express");
const {
  roleListController,
  roleCreateController,
  roleDetailController,
  roleUpdateController,
  roleDeleteController,
} = require("./controllers");
const {
  roleValidationCustomAccessList,
  roleValidationCreate,
  roleValidationUpdate,
} = require("./validations");
const {
  jwtAuthMiddleware,
  hasPermissionsMiddleware,
  validationMiddleware,
} = require("../../utils/middlewares");
const { textField, itemsField } = require("../../utils/fields");
const {
  rolePermissionRead,
  rolePermissionCreate,
  rolePermissionUpdate,
  rolePermissionDelete,
} = require("./permissions");

const roleRouter = express.Router();
const ROLE_PATH = "/roles";

roleRouter.get(
  "/",
  [jwtAuthMiddleware, rolePermissionRead],
  roleListController
);

roleRouter.post(
  "/",
  [jwtAuthMiddleware, rolePermissionCreate, roleValidationCreate],
  roleCreateController
);

roleRouter.get(
  "/:id",
  [jwtAuthMiddleware, rolePermissionRead],
  roleDetailController
);

roleRouter.put(
  "/:id",
  [jwtAuthMiddleware, rolePermissionUpdate, roleValidationUpdate],
  roleUpdateController
);

roleRouter.delete(
  "/:id",
  [jwtAuthMiddleware, rolePermissionDelete],
  roleDeleteController
);

module.exports = {
  roleRouter,
  ROLE_PATH,
};
