import express from 'express';
import * as registrosPresupuestalesController from '../../controllers/v1/registros_presupuestales/registros_presupuestales.controller.js';
import { 
  createRegistroPresupuestalValidator, 
  updateRegistroPresupuestalValidator, 
  idRegistroPresupuestalValidator,
  createMultipleRegistrosPresupuestalesValidator
} from '../../middlewares/validators/registros_presupuestales.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todos los registros presupuestales (con paginación)
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_REGISTROS_PRESUPUESTALES]
    )
  ],
  registrosPresupuestalesController.getRegistrosPresupuestales
);

// Ruta para obtener lista de registros presupuestales sin paginación
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_REGISTROS_PRESUPUESTALES]
    )
  ],
  registrosPresupuestalesController.getListRegistrosPresupuestales
);

// Ruta para crear un registro presupuestal
router.post('/',
  createRegistroPresupuestalValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_REGISTROS_PRESUPUESTALES])
  ],
  registrosPresupuestalesController.storeRegistroPresupuestal
);

// Ruta para crear múltiples registros presupuestales
router.post('/multiple',
  createMultipleRegistrosPresupuestalesValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_REGISTROS_PRESUPUESTALES])
  ],
  registrosPresupuestalesController.storeMultipleRegistrosPresupuestales
);

// Ruta para actualizar un registro presupuestal por ID
router.put('/:id',
  updateRegistroPresupuestalValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_REGISTROS_PRESUPUESTALES])
  ],
  registrosPresupuestalesController.updateRegistroPresupuestal
);

// Ruta para obtener un registro presupuestal por ID
router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_REGISTROS_PRESUPUESTALES])
  ],
  idRegistroPresupuestalValidator,
  validateRequest,
  registrosPresupuestalesController.showRegistroPresupuestal
);

export default router;
