function notFound(req, res, next) {
  res.status(404).json({
    message: "Page not found",
  });
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
}

module.exports = { notFound, errorHandler };
