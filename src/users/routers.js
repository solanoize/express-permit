const express = require("express");
const {
  userListController,
  userCreateController,
  userDetailController,
  userUpdateController,
  userSignInController,
  userDeleteController,
} = require("./controllers");
const { jwtAuthMiddleware } = require("../utils/middlewares");
const {
  userValidationCreate,
  userValidationUpdate,
  userValidationSignIn,
} = require("./validations");
const {
  userPermissionRead,
  userPermissionCreate,
  userPermissionUpdate,
  userPermissionDelete,
} = require("./permissions");

const userRouter = express.Router();
const USER_PATH = "/users";

userRouter.get(
  "/",
  [jwtAuthMiddleware, userPermissionRead],
  userListController
);

userRouter.post(
  "/",
  [jwtAuthMiddleware, userPermissionCreate, userValidationCreate],
  userCreateController
);

userRouter.get(
  "/:email",
  [jwtAuthMiddleware, userPermissionRead],
  userDetailController
);

userRouter.put(
  "/:email",
  [jwtAuthMiddleware, userPermissionUpdate, userValidationUpdate],
  userUpdateController
);

userRouter.delete(
  "/:email",
  [jwtAuthMiddleware, userPermissionDelete],
  userDeleteController
);

userRouter.post("/signin", [userValidationSignIn], userSignInController);

module.exports = {
  userRouter,
  USER_PATH,
};
