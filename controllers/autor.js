const ErrorResponse = require("../helper/errorResponse");

const Autor = require("../models/Autor");

exports.crearAutor = async (req, res, next) => {
  try {
    const autorData = await Autor.create(req.body);

    res.status(200).json({
      status: 200,
      data: autorData,
    });
  } catch (error) {
    next(new ErrorResponse("Errores no es posible crear el autor " + error.message, 404));
  }
};

exports.getAutor = async (req, res, next) => {
  try {
    const autorLista = await Autor.find();
    console.log(autorLista);
    res.status(200).json(autorLista);
  } catch (error) {
    next(new ErrorResponse("No se pudo procesar el request " + error.message, 404));
  }
};

exports.getAutorById = async (req, res, next) => {
  try {
    const autor = await Autor.findById(req.params.id);

    if (!autor) {
      return next(
        new ErrorResponse("El autor no existe en la BD con este id " + req.params.id, 404)
      );
    }

    res.status(200).json(autor);
  } catch (error) {
    // middleware de errores personalilzados
    next(new ErrorResponse("El autor no existe con este id " + req.params.id, 404));
  }
};

exports.updateAutor = async (req, res, next) => {
  try {
    const autor = await Autor.findByIdAndUpdate(req.params.id, req.body);

    if (!autor) {
      return next(new ErrorResponse("El autor no existe con este id " + req.params.id, 404));
    }

    res.status(200).json({ status: 200, data: autor });
  } catch (error) {
    next(new ErrorResponse("El autor no existe con este id " + req.params.id, 404));
  }
};

exports.deleteAutor = async (req, res, next) => {
  try {
    const autor = await Autor.findByIdAndDelete(req.params.id);

    if (!autor) {
      return next(new ErrorResponse("El autor no existe con este id " + req.params.id, 404));
    }

    res.status(200).json({ status: 200 });
  } catch (error) {
    next(new ErrorResponse("El autor no existe con este id " + req.params.id, 404));
  }
};
