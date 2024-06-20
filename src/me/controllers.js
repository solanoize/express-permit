const { exceptionHandler } = require("../utils/errors");
const { Role } = require("../roles/models");
const { User } = require("../users/models");

const meAccessController = async (req, res) => {
  try {
    const role = await Role.findOne({ _id: res.locals.user?.role });
    const accessList = role?.accessList || [];
    const superuser = res.locals.user?.isSuperuser || false;
    return res.status(200).json({ accessList, superuser });
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const meDetailController = async (req, res) => {
  try {
    return res.status(200).json(res.locals.user);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const meUpdateController = async (req, res) => {
  try {
    result = await User.findOneAndUpdate(
      { email: res.locals.user.email },
      res.locals.matchedData,
      { new: true, fields: "-password" }
    );
    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

module.exports = {
  meDetailController,
  meUpdateController,
  meAccessController,
};
