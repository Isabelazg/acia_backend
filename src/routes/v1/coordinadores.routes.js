import express from 'express';
import * as CoordinadorController from '../../controllers/v1/coordinador/coordinador.controller.js';
import { createCoordinadorValidator, updateCoordinadorValidator, idParamValidator } from '../../middlewares/validators/coordinadores.validator.js';
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
    ], [PermisoEnum.GESTIONAR_REGIONALES])
  ],
  CoordinadorController.getCoordinadores
);

router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([
      RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO
    ], [PermisoEnum.GESTIONAR_REGIONALES])
  ],
  CoordinadorController.getListCoordinadores
);

router.post('/',
  createCoordinadorValidator, validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_REGIONALES])
  ],
  CoordinadorController.storeCoordinador
);


router.put('/:id',
  updateCoordinadorValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_REGIONALES])
  ],
  CoordinadorController.updateCoordinador
);

// Ruta para cambiar el estado de un coordinador
router.patch('/:id/estado',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_REGIONALES])
  ],
  CoordinadorController.changeCoordinadorStatus
);

router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_REGIONALES])
  ],
  idParamValidator,
  CoordinadorController.showCoordinador
);

export default router;
