const { hasPermissionsMiddleware } = require("../utils/middlewares");

const userPermissionRead = hasPermissionsMiddleware(["read-users"]);

const userPermissionCreate = hasPermissionsMiddleware([
  "read-users",
  "read-roles",
]);

const userPermissionUpdate = hasPermissionsMiddleware([
  "update-users",
  "read-roles",
]);

const userPermissionDelete = hasPermissionsMiddleware([
  "delete-users",
  "read-roles",
]);

module.exports = {
  userPermissionRead,
  userPermissionCreate,
  userPermissionUpdate,
  userPermissionDelete,
};
