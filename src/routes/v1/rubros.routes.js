import express from 'express';
import * as RubroController from '../../controllers/v1/rubros/rubro.controller.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from '../../middlewares/validateRequest.middleware.js';
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todos los rubros
router.get(
  '/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO], [PermisoEnum.VER_RUBROS]),
  ],
  RubroController.getRubros
);

// Ruta para obtener la lista de rubros
router.get(
  '/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO], [PermisoEnum.VER_RUBROS]),
  ],
  RubroController.getListRubros
);

// Ruta para obtener un rubro por ID
router.get(
  '/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO], [PermisoEnum.VER_RUBROS]),
  ],
  RubroController.showRubro
);

// Ruta para crear un nuevo rubro
router.post(
  '/',
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.CREAR_RUBROS]),
  ],
  RubroController.storeRubro
);

// Ruta para actualizar un rubro por ID
router.put(
  '/:id',
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.EDITAR_RUBROS]),
  ],
  RubroController.updateRubro
);

// Ruta para eliminar un rubro por ID
router.delete(
  '/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.ELIMINAR_RUBROS]),
  ],
  RubroController.deleteRubro
);

export default router;