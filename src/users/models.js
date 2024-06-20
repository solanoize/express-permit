const mongoose = require("mongoose");
const { configSchema } = require("../utils/databases");

const userObject = {
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  isSuperuser: { type: Boolean, default: false },
  isDelete: { type: Boolean, default: false },
};

const userSchema = new mongoose.Schema(userObject, configSchema);

const User = new mongoose.model("User", userSchema);

module.exports = {
  userObject,
  userSchema,
  User,
};
