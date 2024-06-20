const mongoose = require("mongoose");
const { logger } = require("./helpers");

const configSchema = {
  versionKey: false,
  timestamps: true,
};

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      logger.info("Database connected");
    })
    .catch((error) => {
      logger.error(error.message);
    });
};

module.exports = {
  connectDB,
  configSchema,
};
