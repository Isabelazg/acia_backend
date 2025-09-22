import express from 'express';
import * as CodigoRubroController from '../../controllers/v1/codigo_rubros/codigo_rubro.controller.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from '../../middlewares/validateRequest.middleware.js';
import { createCodigoRubroValidator, updateCodigoRubroValidator, idParamValidator } from '../../middlewares/validators/codigo_rubros.validator.js';
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todos los códigos de rubros
router.get(
  '/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO], [PermisoEnum.VER_CODIGO_RUBROS]),
  ],
  CodigoRubroController.getCodigoRubros
);

// Ruta para obtener la lista de códigos de rubros sin paginación
router.get(
  '/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO], [PermisoEnum.VER_CODIGO_RUBROS]),
  ],
  CodigoRubroController.getListCodigoRubros
);

// Ruta para crear un nuevo código de rubro
router.post(
  '/',
  createCodigoRubroValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.CREAR_CODIGO_RUBROS]),
  ],
  CodigoRubroController.storeCodigoRubro
);

// Ruta para actualizar un código de rubro por ID
router.put(
  '/:id',
  updateCodigoRubroValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.EDITAR_CODIGO_RUBROS]),
  ],
  CodigoRubroController.updateCodigoRubro
);

// Ruta para eliminar un código de rubro por ID
router.delete(
  '/:id',
  idParamValidator,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.ELIMINAR_CODIGO_RUBROS]),
  ],
  CodigoRubroController.deleteCodigoRubro
);

// Ruta para obtener un código de rubro por ID
router.get(
  '/:id',
  idParamValidator,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO], [PermisoEnum.VER_CODIGO_RUBROS]),
  ],
  CodigoRubroController.showCodigoRubro
);

export default router;