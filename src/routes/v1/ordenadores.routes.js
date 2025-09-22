import express from 'express';
import * as OrdenadorController from '../../controllers/v1/ordenador/ordenador.controller.js';
import { createOrdenadorValidator, updateOrdenadorValidator, updateOrdenadorByIdValidator, documentoParamValidator, idParamValidator, statusOrdenadorValidator } from '../../middlewares/validators/ordenadores.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todos los ordenadores con paginación
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.SUPERADMINISTRADOR, RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.GESTIONAR_CDPS] // Usando el permiso de CDPs ya que ordenadores está relacionado
    )
  ],
  OrdenadorController.getOrdenadores
);

// Ruta para obtener lista de ordenadores sin paginación
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.SUPERADMINISTRADOR, RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.GESTIONAR_CDPS]
    )
  ],
  OrdenadorController.getListOrdenadores
);

// Ruta para crear un nuevo ordenador
router.post('/',
  createOrdenadorValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.SUPERADMINISTRADOR, RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_CDPS])
  ],
  OrdenadorController.storeOrdenador
);

// Ruta para editar un ordenador por ID
router.put('/:id',
  idParamValidator,
  validateRequest,
  updateOrdenadorByIdValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.SUPERADMINISTRADOR, RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_CDPS])
  ],
  OrdenadorController.updateOrdenadorById
);

// Ruta para obtener un ordenador por ID
router.get('/:id',
  idParamValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.SUPERADMINISTRADOR, RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_CDPS])
  ],
  OrdenadorController.showOrdenadorById
);

// Ruta para cambiar el estado de un ordenador por ID
router.patch('/:id/status',
  idParamValidator,
  validateRequest,
  statusOrdenadorValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.SUPERADMINISTRADOR, RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_CDPS])
  ],
  OrdenadorController.changeOrdenadorStatusById
);

export default router;
