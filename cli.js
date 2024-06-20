require("dotenv").config();
const chalk = require("chalk");
const { program } = require("commander");

const bcrypt = require("bcryptjs");
const { connectDB } = require("./src/utils/databases");
const { User } = require("./src/users/models");
const { logger } = require("./src/utils/helpers");
const { default: mongoose } = require("mongoose");
const { PREFIX_PERMISSIONS } = require("./src/utils/constants");
const { Permission } = require("./src/permissions/models");

connectDB();

const generatePermissions = async (exit = false) => {
  logger.info(chalk.greenBright("running generatePermissions()"));
  await Permission.deleteMany();
  const collections = mongoose.connections[0].collections;

  for (const model of Object.keys(collections)) {
    const data = PREFIX_PERMISSIONS.map((val) => {
      return {
        model,
        access: `${val}-${model.toLowerCase()}`,
      };
    });

    await Permission.insertMany(data);
  }

  if (exit) {
    process.exit(0);
  }
};

const generateSuperuser = async (exit = false) => {
  logger.info(chalk.greenBright("running generateSuperuser()"));
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  await User.create({
    email: process.env.ADMIN_EMAIL,
    password,
    isSuperuser: true,
    isActive: true,
    firstName: process.env.ADMIN_FIRSTNAME,
    lastName: process.env.ADMIN_LASTNAME,
  });

  if (exit) {
    process.exit(0);
  }
};

program
  .option("-s, --create-superuser")
  .option("-p, --permissions")
  .option("-i, --init");

program.parse();

const options = program.opts();
if (options.createSuperuser) {
  generateSuperuser(true);
} else if (options.permissions) {
  generatePermissions(true);
} else if (options.init) {
  (async () => {
    await generatePermissions();
    await generateSuperuser();
    process.exit(0);
  })();
} else {
  process.exit(1);
}
