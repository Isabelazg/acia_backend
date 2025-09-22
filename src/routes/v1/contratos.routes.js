import express from 'express';
import * as ContratoController from '../../controllers/v1/contrato/contrato.controller.js';
import { createContratoValidator, updateContratoValidator, numeroParamValidator } from '../../middlewares/validators/contratos.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([
      RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO
    ], [PermisoEnum.GESTIONAR_CONTRATOS])
  ],
  ContratoController.getContratos
);

router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_CONTRATOS]
    )
  ],
  ContratoController.getListContratos
);

router.post('/',
  createContratoValidator, validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_CONTRATOS])
  ],
  ContratoController.storeContrato
);

router.put('/:numero',
  updateContratoValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_CONTRATOS])
  ],
  ContratoController.updateContrato
);

router.get('/:numero',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_CONTRATOS])
  ],
  numeroParamValidator,
  ContratoController.showContrato
);

export default router;
