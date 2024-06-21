const { body } = require("express-validator");

const field = (name, optional) => {
  const f = body(name);
  if (optional) {
    f.optional();
  }

  f.exists().bail().withMessage("Mohon pastikan bidang ini diisi.");
  f.notEmpty().bail().withMessage("Mohon pastikan input tidak kosong.");
  return f;
};

const textField = (name, optional = false) => {
  const f = field(name, optional);
  f.isString().bail().withMessage("Mohon masukkan teks atau kata-kata.");
  return f;
};

const numberField = (name, optional = false) => {
  const f = field(name, optional);
  f.isInt()
    .bail()
    .withMessage("Harap pastikan nilai yang dimasukkan adalah bilangan bulat.");
  return f;
};

const itemsField = (name, min = 1, max = 0, optional = false) => {
  const f = field(name, optional);
  if (min === 0 && max > 0) {
    f.isArray({ max })
      .bail()
      .withMessage(
        `Jumlah maksimal item yang diperbolehkan adalah ${max} item.`
      );
  } else if (min > 0 && max === 0) {
    f.isArray({ min })
      .bail()
      .withMessage(
        `Jumlah minimum item yang diperbolehkan adalah ${min} item.`
      );
  } else if (min > 0 && max > 0) {
    f.isArray({ min, max })
      .bail()
      .withMessage(
        `Batas item yang diperbolehkan: ${min} sampai dengan ${max} item.`
      );
  }

  return f;
};

const objectField = (name, optional = false) => {
  const f = field(name, optional);
  f.isObject()
    .bail()
    .withMessage(
      `Format data tidak sesuai. Harap masukkan data dalam bentuk objek.`
    );

  return f;
};

const objectIDField = (name, optional = false) => {
  const f = field(name, optional);
  f.isMongoId()
    .bail()
    .withMessage(
      `ID yang dimasukkan tidak sesuai. Harap gunakan format yang tepat.`
    );
  return f;
};

const emailField = (
  name,
  options = { allow_ip_domain: false },
  optional = false
) => {
  const f = field(name, optional);
  f.isEmail(options)
    .bail()
    .withMessage("Mohon masukkan alamat email yang valid.");
  return f;
};

const passwordField = (name, optional = false) => {
  const f = field(name, optional);
  f.isStrongPassword().bail().withMessage("Mohon masukkan password yang aman.");
  return f;
};

const booleanField = (name, optional = false) => {
  const f = field(name, optional);
  f.isBoolean().bail().withMessage("Nilai boolean tidak valid.");
  return f;
};

module.exports = {
  field,
  numberField,
  textField,
  itemsField,
  objectField,
  objectIDField,
  emailField,
  passwordField,
  booleanField,
};
