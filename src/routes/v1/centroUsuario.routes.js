import express from "express";
import {
  asociarUsuarioCentro,
  quitarUsuarioCentro,
  listarUsuariosDeCentro,
  listarCentrosDeUsuario
} from "../../controllers/v1/centros/centroUsuario.controller.js";
import { verificarToken, verificarCuentaActiva } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Asociar usuario a centro
router.post(
  "/",
  verificarToken,
  verificarCuentaActiva,
  asociarUsuarioCentro
);

// Quitar usuario de centro
router.delete(
  "/",
  verificarToken,
  verificarCuentaActiva,
  quitarUsuarioCentro
);

// Listar usuarios de un centro
router.get(
  "/centro/:centro_id",
  verificarToken,
  verificarCuentaActiva,
  listarUsuariosDeCentro
);

// Listar centros de un usuario
router.get(
  "/usuario/:usuario_id",
  verificarToken,
  verificarCuentaActiva,
  listarCentrosDeUsuario
);

export default router;