import express from 'express';
import * as educacion_informalController from '../../controllers/v1/educacion_informal/educacion_informales.controller.js';
import { 
  createeducacion_informalValidator, 
  updateeducacion_informalValidator, 
  ideducacion_informalValidator,
  createMultipleEducacionesInformalesValidator
} from '../../middlewares/validators/educacion_informal.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todas las educaciones informales
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_EDUCACION_INFORMAL]
    )
  ],
  educacion_informalController.geteducacion_informal
);

// Ruta para obtener lista de todas las educaciones informales sin paginación
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_EDUCACION_INFORMAL]
    )
  ],
  educacion_informalController.getListeducacion_informal
);

// Ruta para crear una nueva educación informal individual
router.post('/',
  createeducacion_informalValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_EDUCACION_INFORMAL])
  ],
  educacion_informalController.storeeducacion_informal
);

// Ruta para crear múltiples educaciones informales
router.post('/multiple',
  createMultipleEducacionesInformalesValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_EDUCACION_INFORMAL])
  ],
  educacion_informalController.storeMultipleEducaciones
);

// Ruta para actualizar una educación informal por ID
router.put('/:id',
  updateeducacion_informalValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_EDUCACION_INFORMAL])
  ],
  educacion_informalController.updateeducacion_informal
);

// Ruta para obtener una educación informal por ID
router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_EDUCACION_INFORMAL])
  ],
  ideducacion_informalValidator,
  validateRequest,
  educacion_informalController.showeducacion_informal
);

export default router;