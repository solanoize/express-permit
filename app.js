const express = require("express");
const cors = require("cors");

const { connectDB } = require("./src/utils/databases");
const {
  permissionRouter,
  PERMISSION_PATH,
} = require("./src/apps/permissions/routers");
const { ROLE_PATH, roleRouter } = require("./src/apps/roles/routers");
const { USER_PATH, userRouter } = require("./src/apps/users/routers");
const { ME_PATH, meRouter } = require("./src/apps/me/routers");

connectDB();
const app = express();

app.use(express.json());

app.use(cors({ origin: process.env.API_ORIGIN }));

app.use(PERMISSION_PATH, permissionRouter);
app.use(ROLE_PATH, roleRouter);
app.use(USER_PATH, userRouter);
app.use(ME_PATH, meRouter);

module.exports = {
  app,
};
