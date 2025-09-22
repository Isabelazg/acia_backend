import express from 'express';
// Ruta de importación corregida para ser consistente con la convención
import * as experiencia_laboralController from '../../controllers/v1/experiencias_laboral/experiencias_laboral.controller.js';
import { 
  createexperiencia_laboralValidator, 
  updateexperiencia_laboralValidator, 
  idexperiencia_laboralValidator,
  createMultipleexperienciasValidator
} from '../../middlewares/validators/experiencia_laboral.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todas las experiencias laborales
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_EXPERIENCIA_LABORAL]
    )
  ],
  experiencia_laboralController.getexperiencia_laboral
);

// Ruta para obtener lista de todas las experiencias laborales sin paginación
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_EXPERIENCIA_LABORAL]
    )
  ],
  experiencia_laboralController.getListexperiencia_laboral
);

// Ruta para crear una nueva experiencia laboral individual
router.post('/',
  createexperiencia_laboralValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_EXPERIENCIA_LABORAL])
  ],
  experiencia_laboralController.storeexperiencia_laboral
);

// Ruta para crear múltiples experiencias laborales
router.post('/multiple',
  createMultipleexperienciasValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_EXPERIENCIA_LABORAL])
  ],
  experiencia_laboralController.storeMultipleExperiencias
);

// Ruta para actualizar una experiencia laboral por ID
router.put('/:id',
  updateexperiencia_laboralValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_EXPERIENCIA_LABORAL])
  ],
  experiencia_laboralController.updateexperiencia_laboral
);

// Ruta para obtener una experiencia laboral por ID
router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_EXPERIENCIA_LABORAL])
  ],
  idexperiencia_laboralValidator,
  validateRequest,
  experiencia_laboralController.showexperiencia_laboral
);

export default router;