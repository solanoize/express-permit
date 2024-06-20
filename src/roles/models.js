const mongoose = require("mongoose");
const { configSchema } = require("../utils/databases");

const roleObject = {
  name: { type: String, required: true, unique: true },
  accessList: [{ type: String, required: true }],
  isDelete: { type: Boolean, default: false },
};

const roleSchema = new mongoose.Schema(roleObject, configSchema);

const Role = new mongoose.model("Role", roleSchema);

module.exports = {
  roleObject,
  roleSchema,
  Role,
};
