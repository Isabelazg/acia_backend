import express from 'express';
import * as DependenciaController from '../../controllers/v1/dependencia/dependencia.controller.js';
import { createDependenciaValidator, updateDependenciaValidator, codigoParamValidator } from '../../middlewares/validators/dependencias.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Obtener todas las dependencias
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.VER_DEPENDENCIAS]
    ),
  ],
  DependenciaController.getDependencias
);

// Obtener lista básica de dependencias
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.VER_DEPENDENCIAS]
    ),
  ],
  DependenciaController.getListDependencias
);

// Crear una nueva dependencia
router.post('/',
  createDependenciaValidator, validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.CREAR_DEPENDENCIAS])
  ],
  DependenciaController.storeDependencia
);

// Editar una dependencia por código
router.put('/:codigo',
  updateDependenciaValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.EDITAR_DEPENDENCIAS])
  ],
  DependenciaController.updateDependencia
);

// Obtener una dependencia por código
router.get('/:codigo',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.VER_DEPENDENCIAS])
  ],
  codigoParamValidator,
  DependenciaController.showDependencia
);

// Ruta para cambiar el estado de una dependencia
router.patch('/:codigo/estado',
  codigoParamValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.EDITAR_DEPENDENCIAS])
  ],
  DependenciaController.changeEstadoDependencia // Debes crear este método en el controlador
);

// Obtener dependencias por centro
router.get('/centro/:centroId',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.VER_DEPENDENCIAS]
    )
  ],
  DependenciaController.getDependenciasByCentro
);

export default router;