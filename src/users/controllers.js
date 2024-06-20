const { exceptionHandler } = require("../utils/errors");
const { filterSearch } = require("../utils/filters");
const { makeJWTToken } = require("../utils/helpers");
const { buildPagination } = require("../utils/paginations");
const { Role } = require("../roles/models");
const { User } = require("./models");

const userListController = async (req, res) => {
  try {
    let result = User.find({ isDelete: false }, "-password");
    result = filterSearch(req, result);
    result = await buildPagination(req, result);
    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const userCreateController = async (req, res) => {
  try {
    await User.create(res.locals.matchedData);
    const { password, ...payload } = res.locals.matchedData;
    return res.status(201).json(payload);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const userSignInController = async (req, res) => {
  try {
    const user = await User.findOne({
      email: res.locals.matchedData.email,
    });

    const token = makeJWTToken({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

    const role = await Role.findOne({ _id: user.role });
    const accessList = role?.accessList || [];
    const superuser = user.isSuperuser || false;
    return res.status(200).json({ token, accessList, superuser });
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const userDetailController = async (req, res) => {
  try {
    const result = await User.findOne(
      {
        email: req.params.email,
        isDelete: false,
        isActive: true,
      },
      "-password -isDelete"
    );

    if (!result) {
      throw new Error("Data not found");
    }

    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const userUpdateController = async (req, res) => {
  try {
    let result = await User.findOne({
      email: req.params.email,
      isDelete: false,
      isActive: true,
    });

    if (!result) {
      throw new Error("Data not found");
    }

    result = await User.findOneAndUpdate(
      { email: req.params.email, isDelete: false, isActive: true },
      res.locals.matchedData,
      { new: true }
    ).select("-password");

    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const userDeleteController = async (req, res) => {
  try {
    let result = await User.findOne(
      { email: req.params.email, isActive: true, isDelete: false },
      { isActive: false }
    );

    if (!result) {
      throw new Error404("Data not found");
    }

    await User.findOneAndUpdate(
      { email: req.params.email },
      { isActive: false, isDelete: true }
    );

    return res.status(204).json(null);
  } catch (e) {
    return exceptionHandler(e, res);
  }
};

module.exports = {
  userListController,
  userCreateController,
  userDetailController,
  userUpdateController,
  userSignInController,
  userDeleteController,
};
