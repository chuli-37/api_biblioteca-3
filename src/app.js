const express = require("express");

const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require("./middlewares/errorHandler");


require('dotenv').config();

// Configuracion Middleware con el Servidor de Autorización 
const autenticacion = auth({
  audience: process.env.OAUTH_AUDIENCE,
  issuerBaseURL: process.env.OAUTH_URL,
  tokenSigningAlg: "RS256",
});


const app = express();
app.use(express.json());

// Importamos el Router de Libros
const librosRouter = require("./routes/libros");
const clientesRouter = require("./routes/clientes");

//Configuramos el middleware de autenticacion
app.use("/api/libros", autenticacion,  librosRouter);
app.use("/api/clientes", autenticacion, clientesRouter);

// Middleware para manejo de errores
app.use(errorHandler);

app.listen(3001, () => {
  console.log("Servidor iniciado en el puerto 3001");
});

module.exports = app;