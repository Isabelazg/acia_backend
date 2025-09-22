import express from "express";
import * as autotizacionesController from "../../controllers/v1/informacion_completa/hoja_de_vida.controller.js";
import { createAutorizacionesValidator } from "../../middlewares/validators/hoja_de_vida.validator.js";
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from "../../middlewares/auth.middleware.js";
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from "../../enums/rol.enum.js";
import { PermisoEnum } from "../../enums/permiso.enum.js";

const router = express.Router();

/**
 * 🔹 POST -> Guardar información completa
 */
router.post(
  "/completa",
  createAutorizacionesValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [
        PermisoEnum.GESTIONAR_ORDENADOR,
        PermisoEnum.GESTIONAR_TIPO_CONTRATACION,
        PermisoEnum.GESTIONAR_EDUCACION_INFORMAL,
        PermisoEnum.GESTIONAR_CERTIFICACIONES,
        PermisoEnum.GESTIONAR_EXPERIENCIA_LABORAL,
        PermisoEnum.GESTIONAR_INFORMACION_PREVIA_CONTRATO,
      ]
    ),
  ],
  autotizacionesController.storeAutorizaciones
);



/**
 * 🔹 GET -> Consultar lista completa sin paginación
 */
router.get(
  "/list",
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_INFORMACION_COMPLETA]
    ),
  ],
  autotizacionesController.getListinformacion_completa
);



/**
 * 🔹 GET -> Consultar lista con paginación y filtros
 */
router.get(
  "/",
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_INFORMACION_COMPLETA]
    ),
  ],
  autotizacionesController.getListpageinformacion_completa
);



/**
 * 🔹 GET -> Consultar información completa de un usuario por ID
 */
router.get(
  "/:id",
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [
        PermisoEnum.GESTIONAR_INFORMACION_PERSONAL,
        PermisoEnum.GESTIONAR_EDUCACION_FORMAL,
        PermisoEnum.GESTIONAR_EDUCACION_INFORMAL,
        PermisoEnum.GESTIONAR_CERTIFICACIONES,
        PermisoEnum.GESTIONAR_EXPERIENCIA_LABORAL,
        PermisoEnum.GESTIONAR_INFORMACION_PREVIA_CONTRATO,
      ]
    ),
  ],
  autotizacionesController.obtenerAutorizaciones
);

export default router;