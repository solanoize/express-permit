const mongoose = require("mongoose");
const { configSchema } = require("../utils/databases");

const permissionObject = {
  model: { type: String, required: true },
  access: { type: String, required: true, unique: true },
  isDelete: { type: Boolean, default: false },
};

const permissionSchema = new mongoose.Schema(permissionObject, configSchema);

const Permission = new mongoose.model("Permission", permissionSchema);

module.exports = {
  permissionObject,
  permissionSchema,
  Permission,
};
