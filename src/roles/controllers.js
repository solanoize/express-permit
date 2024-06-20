const { exceptionHandler } = require("../utils/errors");
const { filterSearch, getObjectOr404 } = require("../utils/filters");
const { buildPagination } = require("../utils/paginations");
const { Role } = require("./models");

const roleListController = async (req, res) => {
  try {
    let result = Role.find({ isDelete: false });
    result = filterSearch(req, result);
    result = await buildPagination(req, result);
    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const roleCreateController = async (req, res) => {
  try {
    const result = await Role.create(res.locals.matchedData);
    return res.status(201).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const roleDetailController = async (req, res) => {
  try {
    const result = await getObjectOr404(Role, {
      _id: req.params.id,
      isDelete: false,
    });

    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const roleUpdateController = async (req, res) => {
  try {
    await getObjectOr404(Role, { _id: req.params.id, isDelete: false });

    result = await Role.findOneAndUpdate(
      { _id: req.params.id, isDelete: false },
      res.locals.matchedData,
      { new: true }
    );
    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const roleDeleteController = async (req, res) => {
  try {
    await getObjectOr404(Role, { _id: req.params.id, isDelete: false });
    await Role.findOneAndUpdate(
      { _id: req.params.id, isDelete: false },
      { isDelete: true }
    );
    return res.status(204).json(null);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

module.exports = {
  roleListController,
  roleCreateController,
  roleDetailController,
  roleUpdateController,
  roleDeleteController,
};
