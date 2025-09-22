import express from 'express';
import * as educacion_formalController from '../../controllers/v1/educacion_formales/educacion_formal.controller.js';
import { 
  createeducacion_formalValidator, 
  updateeducacion_formalValidator, 
  ideducacion_formalValidator,
  createMultipleEducacionesValidator
} from '../../middlewares/validators/educacion_formal.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todos las educaciones formales
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_EDUCACION_FORMAL]
    )
  ],
  educacion_formalController.geteducacion_formal
);

// Ruta para obtener lista de todas las educaciones formales sin paginacion
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_EDUCACION_FORMAL]
    )
  ],
  educacion_formalController.getListeducacion_formal
);

// Ruta para crear una nueva educación formal individual
router.post('/',
  createeducacion_formalValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_EDUCACION_FORMAL])
  ],
  educacion_formalController.storeeducacion_formal
);

// Ruta para crear múltiples educaciones formales
router.post('/multiple',
  createMultipleEducacionesValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_EDUCACION_FORMAL])
  ],
  educacion_formalController.storeMultipleEducaciones
);

// Ruta para actualizar una educación formal por ID
router.put('/:id',
  updateeducacion_formalValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_EDUCACION_FORMAL])
  ],
  educacion_formalController.updateeducacion_formal
);

// Ruta para obtener una educación formal por ID
router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_EDUCACION_FORMAL])
  ],
  ideducacion_formalValidator,
  validateRequest,
  educacion_formalController.showeducacion_formal
);

export default router;
