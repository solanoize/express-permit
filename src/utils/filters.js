const { Error404 } = require("./errors");

const filterSearch = (req, model) => {
  const { field, value } = req.query;

  if (!field || !value) {
    return model.find();
  }

  return model.find({
    [field]: { $regex: ".*" + value + ".*", $options: "i" },
  });
};

const getObjectOr404 = async (model, param) => {
  const data = await model.findOne(param);
  if (!data) {
    throw new Error404("Data not found");
  }

  return data;
};

module.exports = {
  filterSearch,
  getObjectOr404,
};
