const sql = require("mssql");

const dbSettings = {
  user: "BlogUser",
  password: "MiContraseñaSegura2025",
  server: "localhost",
  database: "Blog",
  options: {
    trustServerCertificate: true,
    encrypt: false,
  },
};

const poolPromise = new sql.ConnectionPool(dbSettings)
  .connect()
  .then((pool) => {
    console.log("✅ Conectado a SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("❌ Error en la conexión a SQL Server:", err);
  });

module.exports = { sql, poolPromise };
