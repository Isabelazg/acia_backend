import express from 'express';
import * as PermisoController from '../../controllers/v1/permiso/permiso.controller.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from "../../middlewares/auth.middleware.js";
import { permisosValidator, permisosEditValidator, idParamValidator, cambiarEstadoValidator } from '../../middlewares/validators/permisos.validator.js';
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Rutas con los controladores que están funcionando - SOLO ADMINISTRADORES
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([
      RolEnum.ADMINISTRADOR
    ], [PermisoEnum.GESTIONAR_PERMISOS])
  ],
  PermisoController.getPermissions
);

router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([
      RolEnum.ADMINISTRADOR
    ], [PermisoEnum.GESTIONAR_PERMISOS])
  ],
  PermisoController.getListPermissions
);

router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([
      RolEnum.ADMINISTRADOR
    ], [PermisoEnum.VER_PERMISOS])
  ],
  idParamValidator,
  PermisoController.showPermission
);

// Rutas adicionales para CRUD completo - SOLO ADMINISTRADORES
router.post('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([
      RolEnum.ADMINISTRADOR
    ], [PermisoEnum.CREAR_PERMISOS])
  ],
  permisosValidator,
  PermisoController.crearPermisoController
);

router.put('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([
      RolEnum.ADMINISTRADOR
    ], [PermisoEnum.EDITAR_PERMISOS])
  ],
  [...idParamValidator, ...permisosEditValidator],
  PermisoController.editarPermisoController
);

// SOLO el endpoint /estado - eliminamos /status
router.patch('/:id/estado',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([
      RolEnum.ADMINISTRADOR
    ], [PermisoEnum.CAMBIAR_ESTADO_PERMISOS])
  ],
  [...idParamValidator, ...cambiarEstadoValidator],
  PermisoController.cambiarEstadoPermisoController
);

export default router;
