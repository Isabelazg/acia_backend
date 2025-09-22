import express from 'express';
import * as FuenteRecursoController from '../../controllers/v1/fuenteRecurso/fuenteRecurso.controller.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';
import { createFuenteRecursoValidator, updateFuenteRecursoValidator, idParamValidator } from '../../middlewares/validators/fuenteRecursos.validator.js';
import { validateRequest } from '../../middlewares/validateRequest.middleware.js';

const router = express.Router();

// GET con paginación, filtros y orden
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.VER_FUENTES_RECURSOS]
    )
  ],
  FuenteRecursoController.getFuentesRecursos
);

// GET lista simple
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.VER_FUENTES_RECURSOS]
    )
  ],
  FuenteRecursoController.getListFuentesRecursos
);

// GET por id
router.get('/:id',
  idParamValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO], [PermisoEnum.VER_FUENTES_RECURSOS])
  ],
  FuenteRecursoController.showFuenteRecurso
);

// POST crear
router.post('/',
  createFuenteRecursoValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.CREAR_FUENTES_RECURSOS])
  ],
  FuenteRecursoController.storeFuenteRecurso
);

// PUT editar
router.put('/:id',
  updateFuenteRecursoValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.EDITAR_FUENTES_RECURSOS])
  ],
  FuenteRecursoController.updateFuenteRecurso
);

// DELETE eliminar
router.delete('/:id',
  idParamValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.ELIMINAR_FUENTES_RECURSOS])
  ],
  FuenteRecursoController.deleteFuenteRecurso
);

export default router;