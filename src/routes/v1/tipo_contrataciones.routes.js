import express from 'express';
import * as TipoContratacionController from '../../controllers/v1//tipo_contratacion/tipo_contratacion.controller.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from '../../middlewares/validateRequest.middleware.js';
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

router.get(
  '/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO], [PermisoEnum.VER_TIPO_CONTRATACION]),
  ],
  TipoContratacionController.getTipoContratacion
);

router.get(
  '/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO], [PermisoEnum.VER_TIPO_CONTRATACION]),
  ],
  TipoContratacionController.getListTipoContratacion
);

router.post(
  '/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.CREAR_TIPO_CONTRATACION]),
  ],
  validateRequest,
  TipoContratacionController.storeTipoContratacion
);

router.put(
  '/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.EDITAR_TIPO_CONTRATACION]),
  ],
  validateRequest,
  TipoContratacionController.updateTipoContratacion
);

router.delete(
  '/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.ELIMINAR_TIPO_CONTRATACION]),
  ],
  TipoContratacionController.deleteTipoContratacion
);

export default router;