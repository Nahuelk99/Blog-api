const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// Registro de usuario usando el controlador
router.post("/register", register);

// Inicio de sesión usando el controlador
router.post("/login", login);

module.exports = router;
