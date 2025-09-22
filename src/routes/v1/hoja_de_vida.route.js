import express from "express";
import * as informacionCompletaController from "../../controllers/v1/informacion_completa/hoja_de_vida.controller.js";
import { createInformacionCompletaValidator } from "../../middlewares/validators/hoja_de_vida.validator.js";
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from "../../middlewares/auth.middleware.js";
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from "../../enums/rol.enum.js";
import { PermisoEnum } from "../../enums/permiso.enum.js";

const router = express.Router();

router.post(
  "/post",  // <-- nueva ruta POST
  createInformacionCompletaValidator,
  validateRequest,
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
  informacionCompletaController.storeInformacionCompleta
);
/**
 * 🔹 POST -> Guardar información completa
 */
router.post(
  "/completa",
  createInformacionCompletaValidator,
  validateRequest,
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
  informacionCompletaController.storeInformacionCompleta
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
  informacionCompletaController.getListinformacion_completa
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
  informacionCompletaController.getListpageinformacion_completa
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
  informacionCompletaController.obtenerInformacionCompleta
);

export default router;