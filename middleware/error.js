const errorHandler = (error, req, res, next) => {
  console.log("Errores en mi controller", error);

  res.status(500).json({
    status: 500,
    mensaje: error.message,
  });
};

module.exports = errorHandler;
