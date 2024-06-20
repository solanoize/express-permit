const { ERROR_TYPE_DETAIL } = require("./constants");
const { logger } = require("./helpers");

class Error404 extends Error {
  constructor(message) {
    super(message);
    this.name = "Error404";
  }
}

class Error403 extends Error {
  constructor(message) {
    super(message);
    this.name = "Error403";
  }
}

class Error401 extends Error {
  constructor(message) {
    super(message);
    this.name = "Error401";
  }
}

class Error400 extends Error {
  constructor(message) {
    super(message);
    this.name = "Error400";
  }
}

const exceptionHandler = (error, res) => {
  logger.error(`${error.name}: ${error.message}`);

  switch (error.name) {
    case "JsonWebTokenError":
      if (process.env.DEBUG_MODE === "1") {
        return res.status(401).json({
          title: "JsonWebTokenError",
          detail: error.message,
        });
      }

      return res.status(401).json({
        title: "Kredensial tidak Valid",
        detail: "Token otentikasi tidak valid atau telah kedaluwarsa.",
      });
    case "MongoServerError":
      if (process.env.DEBUG_MODE === "1") {
        return res.status(400).json({
          title: "MongoServerError",
          detail: error.message,
        });
      }

      return res.status(400).json({
        title: "Permintaan Tidak Valid",
        detail:
          "Maaf, terjadi masalah saat mengakses basis data kami. Pastikan data benar!",
      });

    case "ValidationError":
      if (process.env.DEBUG_MODE === "1") {
        return res.status(400).json({
          title: "ValidationError",
          detail: error.message,
        });
      }

      return res.status(400).json({
        title: "Permintaan Tidak Valid",
        detail: "Maaf, beberapa data yang Anda masukkan tidak valid.",
      });

    case "CastError":
      if (process.env.DEBUG_MODE === "1") {
        return res.status(400).json({
          title: "CastError",
          detail: error.message,
        });
      }

      return res.status(400).json({
        title: "Permintaan Tidak Valid",
        detail: "Maaf, data yang Anda masukkan tidak dalam format yang benar.",
      });

    case "Error404":
      return res.status(404).json({
        title: "Resource tidak Ditemukan",
        detail: "Maaf, sumber yang Anda cari tidak dapat ditemukan.",
      });
    case "Error401":
      return res.status(401).json({
        title: "Otentikasi Gagal",
        detail:
          "Maaf, kredensial Anda tidak dapat diotentikasi. Silakan login kembali untuk melanjutkan.",
      });
    case "Error403":
      return res.status(403).json({
        title: "Permintaan Ditolak",
        detail: "Maaf, Anda tidak memiliki izin untuk mengakses sumber ini.",
      });
    case "Error400":
      return res.status(400).json({
        title: "Permintaan Tidak Valid",
        detail: "Maaf, permintaan Anda tidak dapat diproses.",
      });
    case "TokenExpiredError":
      if (process.env.DEBUG_MODE === "1") {
        return res.status(401).json({
          title: "TokenExpiredError",
          detail: error.message,
        });
      }

      return res.status(401).json({
        title: "Sesi Habis",
        detail:
          "Maaf, sesi Anda telah kedaluwarsa. Silakan login kembali untuk melanjutkan.",
      });
    default:
      if (process.env.DEBUG_MODE === "1") {
        return res.status(500).json({
          title: "Server Error",
          detail: error.message,
        });
      }

      return res.status(500).json({
        title: "Kesalahan Server",
        detail:
          "Maaf, terjadi masalah di server kami. Silakan coba lagi nanti.",
      });
  }
};

module.exports = {
  Error400,
  Error401,
  Error403,
  Error404,
  exceptionHandler,
};
