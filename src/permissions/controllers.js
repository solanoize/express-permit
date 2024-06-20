const mongoose = require("mongoose");
const { Permission } = require("./models");
const { PREFIX_PERMISSIONS } = require("../utils/constants");
const { exceptionHandler } = require("../utils/errors");
const { filterSearch } = require("../utils/filters");
const { buildPagination } = require("../utils/paginations");

const permissionListController = async (req, res) => {
  try {
    const filter = filterSearch(req, Permission);
    const result = await buildPagination(req, filter);

    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const permissionDetailController = async (req, res) => {
  try {
    const result = await getObjectOr404(Permission, {
      _id: req.params.id,
      isDelete: false,
    });
    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const permissionGenerateController = async (req, res) => {
  try {
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

    return res.status(201).json(null);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

module.exports = {
  permissionListController,
  permissionDetailController,
  permissionGenerateController,
};
