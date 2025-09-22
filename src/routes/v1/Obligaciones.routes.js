import express from 'express';
import * as ObligacionesController from '../../controllers/v1/obligaciones/obligaciones.controller.js';
import { createObligacionesValidator, updateObligacionesValidator, idObligacionesValidator,  } from '../../middlewares/validators/Obligaciones.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todas las obligaciones
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_OBLIGACIONES]
    )
  ],
  ObligacionesController.getObligaciones
);

// Ruta para obtener lista de obligaciones sin paginacion
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_OBLIGACIONES]
    )
  ],
  ObligacionesController.getListObligaciones
);

// Ruta para crear una nueva obligacion
router.post('/',
  createObligacionesValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_OBLIGACIONES])
  ],
  ObligacionesController.storeObligaciones
);

// Ruta para editar una obligacion por ID

router.put('/:id',
  updateObligacionesValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_OBLIGACIONES])
  ],
  ObligacionesController.updateObligaciones
);
// Ruta para obtener una obligacion por ID
router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_OBLIGACIONES])
  ],
  idObligacionesValidator,
  validateRequest,
  ObligacionesController.showObligaciones
);

// Ruta para eliminar una obligación por ID
router.delete('/:id',
  idObligacionesValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_OBLIGACIONES])
  ],
  ObligacionesController.deleteObligaciones
);

export default router;