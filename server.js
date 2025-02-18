const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/postsRoute");
const authRoutes = require("./routes/authRoute");
const { poolPromise } = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Verificar conexión antes de iniciar el servidor
poolPromise
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ No se pudo conectar a la base de datos:", err);
  });
