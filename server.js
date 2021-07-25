const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDatabase = require("./config/db");

dotenv.config({ path: "./config/config.env" });

// Conexion a la base de datos
connectDatabase();

const libro = require("./routes/libro");
const autor = require("./routes/autor");
const usuario = require("./routes/usuario");

const app = express();
app.use(express.json());
app.use(cors());

// middleware morgan captura ruta y verbo que se envia desde el postman
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/LibreriaAutor", autor);
app.use("/api/Libro", libro);
app.use("/usuario", usuario);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, console.log("Servidor de ejecutan en modo", process.env.NODE_ENV));

//capturar errores BD
process.on("unhandledRejection", (err, promise) => {
  console.log("Errores", err.message);
  server.close(() => process.exit(1));
});
