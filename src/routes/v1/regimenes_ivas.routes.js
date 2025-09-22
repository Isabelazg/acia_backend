import express from 'express';
import * as RegimenesIvasController from '../../controllers/v1/regimenes_iva/regimenes_ivas.controller.js';
import { 
  createRegimenIvaValidator, 
  updateRegimenIvaValidator, 
  idRegimenIvaValidator, 
  cambiarEstadoValidator 
} from '../../middlewares/validators/regimenes_ivas.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todos los regimenes de IVA
router.get('/obtener',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_REGIMENES_IVA]
    )
  ],
  RegimenesIvasController.getRegimenesIvas
);

// Ruta para obtener lista de regimenes de IVA sin paginacion
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_REGIMENES_IVA]
    )
  ],
  RegimenesIvasController.getListRegimenesIvas
);

// Ruta para crear un nuevo regimen de IVA
router.post('/crear',
  createRegimenIvaValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_REGIMENES_IVA])
  ],
  RegimenesIvasController.storeRegimenIva
);

// Ruta para actualizar un regimen de IVA por ID
router.put('/:id',
  updateRegimenIvaValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_REGIMENES_IVA])
  ],
  RegimenesIvasController.updateRegimenIva
);

// Ruta para cambiar el estado de un regimen de IVA por ID
router.patch('/:id/estado',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_REGIMENES_IVA])
  ],
  [...idRegimenIvaValidator, ...cambiarEstadoValidator],
  validateRequest,
  RegimenesIvasController.changeRegimenIvaStatus
);

// RUTA GENÉRICA /:id
router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_REGIMENES_IVA])
  ],
  idRegimenIvaValidator,
  validateRequest,
  RegimenesIvasController.showRegimenIva
);

export default router;
