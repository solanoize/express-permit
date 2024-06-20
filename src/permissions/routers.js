const express = require("express");
const {
  permissionListController,
  permissionGenerateController,
} = require("./controllers");
const { jwtAuthMiddleware } = require("../utils/middlewares");
const { permissionRead, permissionCreate } = require("./permissions");

const permissionRouter = express.Router();
const PERMISSION_PATH = "/permissions";

permissionRouter.get(
  "/",
  [jwtAuthMiddleware, permissionRead],
  permissionListController
);

permissionRouter.post(
  "/generate",
  [jwtAuthMiddleware, permissionCreate],
  permissionGenerateController
);

module.exports = {
  permissionRouter,
  PERMISSION_PATH,
};
