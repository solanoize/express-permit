const { hasPermissionsMiddleware } = require("../utils/middlewares");

const permissionRead = hasPermissionsMiddleware(["read-permissions"]);

const permissionCreate = hasPermissionsMiddleware(["create-permissions"]);

module.exports = {
  permissionRead,
  permissionCreate,
};
