const winston = require("winston");
const jwt = require("jsonwebtoken");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) =>
        `(${process.env.DEBUG_MODE === "1" ? "DEBUG=ON" : "DEBUG=OFF"}) ${
          info.timestamp
        } ${info.level}: ${info.message}`
    )
  ),
  // Log to the console and a file
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: process.env.API_LOG }),
  ],
});

const makeJWTToken = (payload) => {
  const token = jwt.sign(payload, process.env.API_TOKEN, { expiresIn: "24h" });

  return token;
};

module.exports = {
  logger,
  makeJWTToken,
};
