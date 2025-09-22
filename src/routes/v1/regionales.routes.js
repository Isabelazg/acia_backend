import express from 'express';
import * as RegionalController from '../../controllers/v1/regional/regional.controller.js';
import { getListCentrosByRegional } from '../../controllers/v1/regional/RegionalCentro.controller.js';
import { createRegionalValidator, updateRegionalValidator, codigoParamValidator, cambiarEstadoValidator } from '../../middlewares/validators/regionales.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todas las regionales
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.GESTIONAR_REGIONALES]
    )
  ],
  RegionalController.getRegionales
);

router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.GESTIONAR_REGIONALES]
    )
  ],
  RegionalController.getListRegionals
);

// Ruta para crear una nueva regional
router.post('/',
  createRegionalValidator, validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_REGIONALES])
  ],
  RegionalController.storeRegional
);

// Ruta para editar una regional por código
router.put('/:codigo',
  updateRegionalValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_REGIONALES])
  ],

  RegionalController.updateRegional
);

// Ruta para cambiar el estado de una regional por código
router.patch('/:codigo/estado',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_REGIONALES])
  ],
  [...codigoParamValidator, ...cambiarEstadoValidator],
  RegionalController.changeRegionalStatus
);

// Ruta para obtener una regional por código
router.get('/:codigo/centros',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO], [PermisoEnum.GESTIONAR_CENTROS])
  ],
  codigoParamValidator,
  getListCentrosByRegional
);

// Ruta para obtener una regional por código
router.get('/:codigo',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_REGIONALES])
  ],
  codigoParamValidator,
  RegionalController.showRegional
);



export default router;