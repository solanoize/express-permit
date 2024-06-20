require("dotenv").config();
const http = require("node:http");
const { app } = require("./app");
const { logger } = require("./src/utils/helpers");
const server = http.createServer(app);

server.listen(process.env.API_PORT, () => {
  logger.info(`server running on port ${process.env.API_PORT}`);
});
