import express from 'express';
import * as SupervisorController from '../../controllers/v1/supervisor/supervisores.controller.js';
import { createSupervisorValidator, updateSupervisorValidator, idParamValidator } from '../../middlewares/validators/supervisores.validator.js';
import { validateRequest } from '../../middlewares/validateRequest.middleware.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todos los supervisores
router.get(
  '/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.SUPERADMINISTRADOR, RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO], [PermisoEnum.VER_SUPERVISORES]),
  ],
  SupervisorController.getSupervisores
);

router.get(
  '/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.SUPERADMINISTRADOR, RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO], [PermisoEnum.VER_SUPERVISORES]),
  ],
  SupervisorController.getListSupervisores
);

// Ruta para crear un supervisor
router.post(
  '/',
  createSupervisorValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.CREAR_SUPERVISORES]),
  ],
  SupervisorController.storeSupervisor
);

// Ruta para actualizar un supervisor por ID
router.put(
  '/:id',
  [...idParamValidator, ...updateSupervisorValidator],
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.EDITAR_SUPERVISORES]),
  ],
  SupervisorController.updateSupervisor
);

// Ruta para obtener un supervisor por ID
router.get(
  '/:id',
  idParamValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO], [PermisoEnum.VER_SUPERVISORES]),
  ],
  SupervisorController.showSupervisor
);

// Ruta para cambiar el estado de un supervisor por ID
router.patch(
  '/:id/estado',
  idParamValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.EDITAR_SUPERVISORES]),
  ],
  SupervisorController.changeSupervisorStatus
);

export default router;