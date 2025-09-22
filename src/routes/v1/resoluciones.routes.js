import express from 'express';
import * as ResolucionController from '../../controllers/v1/resolucion/resolucion.controller.js';
import { createResolucionValidator, updateResolucionByIdValidator, idParamValidator } from '../../middlewares/validators/resoluciones.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todas las resoluciones
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.GESTIONAR_RESOLUCIONES]
    )
  ],
  ResolucionController.getResoluciones
);

// Ruta para obtener la lista de resoluciones
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.GESTIONAR_RESOLUCIONES]
    )
  ],
  ResolucionController.getListResoluciones
);

// Ruta para crear una nueva resolución
router.post('/',
  createResolucionValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_RESOLUCIONES])
  ],
  ResolucionController.storeResolucion
);

// Ruta para editar una resolución por ID
router.put('/:id',
  updateResolucionByIdValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_RESOLUCIONES])
  ],
  ResolucionController.updateResolucionById
);

// Ruta para obtener una resolución por ID
router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.GESTIONAR_RESOLUCIONES]
    )
  ],
  idParamValidator,
  validateRequest,
  ResolucionController.showResolucionById
);

// Ruta para eliminar una resolución por ID
router.delete('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_RESOLUCIONES])
  ],
  idParamValidator,
  validateRequest,
  ResolucionController.deleteResolucionById
);

export default router;
