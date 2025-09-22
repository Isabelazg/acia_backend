import express from 'express';
import * as UsuarioController from "../../controllers/v1/usuario/usuario.controller.js";
import createUserWithEmail from "../../controllers/v1/usuario/createUserWithEmail.controller.js";
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from '../../middlewares/validateRequest.middleware.js';
import { updateUserValidator } from '../../middlewares/validators/usuario.validator.js';
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';


const router = express.Router();

router.get(
  "/",
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([
      RolEnum.SUPERADMINISTRADOR,
      RolEnum.ADMINISTRADOR,
      RolEnum.EMPLEADO,
      RolEnum.USUARIO
    ], [PermisoEnum.GESTIONAR_USUARIOS]),
  ],
  UsuarioController.getUsers
);

router.get('/:id(\\d+)',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([
      RolEnum.ADMINISTRADOR,
      RolEnum.EMPLEADO,
      RolEnum.USUARIO
    ], [PermisoEnum.GESTIONAR_USUARIOS])
  ],
  UsuarioController.showUser
);

router.put('/:id(\\d+)',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([
      RolEnum.ADMINISTRADOR,
      RolEnum.EMPLEADO
    ], [PermisoEnum.GESTIONAR_USUARIOS]),
    updateUserValidator,
    validateRequest
  ],
  UsuarioController.updateUser
);

// Ruta para cambiar el estado de un usuario (activar/desactivar)
router.patch('/:id(\\d+)/estado',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([
      RolEnum.ADMINISTRADOR,
      RolEnum.EMPLEADO
    ], [PermisoEnum.GESTIONAR_USUARIOS])
  ],
  UsuarioController.toggleUserStatus
);

// Ruta para crear un nuevo usuario con envío de email
router.post('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([
      RolEnum.ADMINISTRADOR,
      RolEnum.EMPLEADO
    ], [PermisoEnum.GESTIONAR_USUARIOS])
  ],
  createUserWithEmail
);

export default router;