import express from 'express';
import * as estado_formacionesController from '../../controllers/v1/estado_formaciones/estado_formaciones.controller.js';
import { createestado_formacionesValidator, updateestado_formacionesValidator, idestado_formacionesValidator, cambiarEstadoValidator } from '../../middlewares/validators/estado_formaciones.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todos los estados de formaciones
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_ESTADO_FORMACIONES]
    )
  ],
  estado_formacionesController.getestado_formaciones
);

// Ruta para obtener lista de los estados de formaciones sin paginacion
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_ESTADO_FORMACIONES]
    )
  ],
  estado_formacionesController.getListestado_formaciones
);

// Ruta para crear un nuevo estado de formacion
router.post('/',
  createestado_formacionesValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_ESTADO_FORMACIONES])
  ],
  estado_formacionesController.storeestado_formaciones
);


// Ruta para obtener un estado de formacion por ID
router.put('/:id',
  updateestado_formacionesValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_ESTADO_FORMACIONES])
  ],
  estado_formacionesController.updateestado_formaciones
);

// Ruta para cambiar el estado de una formacion por ID
router.patch('/:id/estado',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_ESTADO_FORMACIONES])
  ],
  [...idestado_formacionesValidator, ...cambiarEstadoValidator],
  validateRequest,
  estado_formacionesController.changeestado_formacionesStatus
);

// RUTA GENÉRICA /:id
router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_ESTADO_FORMACIONES])
  ],
  idestado_formacionesValidator,
  validateRequest,
  estado_formacionesController.showestado_formaciones
);

export default router;