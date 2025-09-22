import express from 'express';
import * as CoordinadorGrupoMixtoController from '../../controllers/v1/grupo_mixto/CoordinadoresGrupoMixto.controller.js';
import {
  createCoordinadorGrupoMixtoValidator,
  updateCoordinadorGrupoMixtoValidator,
  documentoParamValidator,
  cambiarEstadoValidator
} from '../../middlewares/validators/coordinadoresGrupoMixto.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.VER_COORDINADORES_GRUPO_MIXTO]
    ),
  ],
  CoordinadorGrupoMixtoController.getCoordinadoresGrupoMixto
);

router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.VER_COORDINADORES_GRUPO_MIXTO]
    ),
  ],
  CoordinadorGrupoMixtoController.getListCoordinadoresGrupoMixto
);

router.post('/',
  createCoordinadorGrupoMixtoValidator, validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.CREAR_COORDINADORES_GRUPO_MIXTO])
  ],
  CoordinadorGrupoMixtoController.storeCoordinadorGrupoMixto
);

router.put('/:documento',
  updateCoordinadorGrupoMixtoValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.EDITAR_COORDINADORES_GRUPO_MIXTO])
  ],
  CoordinadorGrupoMixtoController.updateCoordinadorGrupoMixto
);

router.patch('/:documento/estado',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.CAMBIAR_ESTADO_COORDINADORES_GRUPO_MIXTO])
  ],
  [...documentoParamValidator, ...cambiarEstadoValidator],
  CoordinadorGrupoMixtoController.changeCoordinadorGrupoMixtoStatus
);

router.get('/:documento',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.VER_COORDINADORES_GRUPO_MIXTO])
  ],
  documentoParamValidator,
  CoordinadorGrupoMixtoController.showCoordinadorGrupoMixto
);

export default router;