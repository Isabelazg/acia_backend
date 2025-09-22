import express from "express";
import * as AreaController from "../../controllers/v1/areas/area.controller.js";
import { areasValidator, areasEditValidator, idParamValidator } from "../../middlewares/validators/areas.validator.js";
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from "../../middlewares/auth.middleware.js";
import { RolEnum } from "../../enums/rol.enum.js";
import { PermisoEnum } from "../../enums/permiso.enum.js";

const router = express.Router();

// Ruta para obtener todas las áreas con filtros y paginación
router.get(
  "/",
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO], [PermisoEnum.GESTIONAR_AREAS]),
  ],
  AreaController.getAreas
);

// Ruta para obtener la lista de áreas sin paginación
router.get(
  "/list",
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO], [PermisoEnum.GESTIONAR_AREAS]),
  ],
  AreaController.getListAreas
);

// Ruta para crear una nueva área
router.post(
  "/",
  areasValidator,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_AREAS]),
  ],
  AreaController.storeArea
);

// Ruta para editar un área por ID
router.put(
  "/:id",
  [...idParamValidator, ...areasEditValidator],
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_AREAS]),
  ],
  AreaController.updateArea
);

// Ruta para cambiar el estado de un área por ID
router.patch(
  "/:id/estado",
  idParamValidator,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_AREAS]),
  ],
  AreaController.changeAreaStatus
);

// Ruta para obtener los centros asociados a un área
router.get(
  '/:id/centros',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO], [PermisoEnum.GESTIONAR_AREAS]),
  ],
  AreaController.getCentrosByArea
);

export default router;