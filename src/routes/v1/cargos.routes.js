import express from 'express';
import * as CargoController from '../../controllers/v1/cargos/cargo.controller.js';
import * as CargoCentroController from '../../controllers/v1/cargos/cargoCentro.controller.js';
import { createCargoValidator, updateCargoValidator, idParamValidator, cambiarEstadoValidator } from '../../middlewares/validators/cargos.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todos los cargos
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.VER_CARGOS]
    ),
  ],
  CargoController.getCargos
);

// Ruta para obtener lista de cargos
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.VER_CARGOS]
    ),
  ],
  CargoController.getListCargos
);

// Ruta para crear un nuevo cargo
router.post('/',
  createCargoValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.CREAR_CARGOS])
  ],
  CargoController.storeCargo
);

// RUTAS CON PARÁMETROS ESPECÍFICOS (ANTES DE LA RUTA GENÉRICA /:id)

// Ruta para obtener los centros de un cargo por ID
router.get('/:id/centros',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.VER_CENTROS]
    )
  ],
  idParamValidator,
  validateRequest,
  CargoCentroController.getListCentrosByCargo
);

// Ruta para editar un cargo por ID
router.put('/:id',
  updateCargoValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.EDITAR_CARGOS])
  ],
  CargoController.updateCargo
);

// Ruta para cambiar el estado de un cargo por ID
router.patch('/:id/estado',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.CAMBIAR_ESTADO_CARGOS])
  ],
  [...idParamValidator, ...cambiarEstadoValidator],
  validateRequest,
  CargoController.changeCargoStatus
);

// RUTA GENÉRICA /:id AL FINAL (para que no capture las rutas específicas)
router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.VER_CARGOS])
  ],
  idParamValidator,
  validateRequest,
  CargoController.showCargo
);

export default router;