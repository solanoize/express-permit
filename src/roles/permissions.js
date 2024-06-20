const { hasPermissionsMiddleware } = require("../utils/middlewares");

const rolePermissionRead = hasPermissionsMiddleware([
  "read-roles",
  "read-permissions",
]);

const rolePermissionCreate = hasPermissionsMiddleware([
  "create-roles",
  "read-permissions",
]);

const rolePermissionUpdate = hasPermissionsMiddleware([
  "update-roles",
  "read-permissions",
]);

const rolePermissionDelete = hasPermissionsMiddleware([
  "delete-roles",
  "read-permissions",
]);

module.exports = {
  rolePermissionCreate,
  rolePermissionRead,
  rolePermissionUpdate,
  rolePermissionDelete,
};
