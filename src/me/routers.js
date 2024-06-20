const express = require("express");
const {
  meDetailController,
  meUpdateController,
  meAccessController,
} = require("./controllers");
const { meUpdateValidationBody } = require("./validations");
const { jwtAuthMiddleware } = require("../utils/middlewares");

const meRouter = express.Router();

const ME_PATH = "/me";

meRouter.get("/", [jwtAuthMiddleware], meDetailController);
meRouter.get("/access-list", [jwtAuthMiddleware], meAccessController);
meRouter.put(
  "/",
  [jwtAuthMiddleware, meUpdateValidationBody],
  meUpdateController
);

module.exports = { meRouter, ME_PATH };
