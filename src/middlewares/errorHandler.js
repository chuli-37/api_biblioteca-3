const errorHandler = (err, req, res, next) => {
  try {
      // Verificar si el error tiene un código de estado definido, de lo contrario, establecer el código de estado predeterminado
      const statusCode = err.statusCode || 500;
  
      // Construir objeto de respuesta de error
      const errorResponse = {
          error: {
              message: err.message || "Error interno del servidor",
              code: err.code || "internal_error",
          },
      };
  
      // Enviar respuesta de error en formato JSON
      res.status(statusCode).json(errorResponse);
  } catch (error) {
      // Manejar cualquier error que ocurra durante el manejo de errores
      next(error);
  }
};

module.exports = errorHandler;