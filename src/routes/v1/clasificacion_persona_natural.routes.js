import express from 'express';
import * as clasificacion_persona_naturalController from '../../controllers/v1/clasificacion_persona_natural/clasificacion_persona_natural.controller.js';
import { createclasificacion_persona_naturalValidator, updateclasificacion_persona_naturalValidator, idclasificacion_persona_naturalValidator, cambiarEstadoValidator } from '../../middlewares/validators/clasificacion_persona_natural.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todos los clasificaion de persona natural
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_CLASIFICACION_PERSONA_NATURAL]
    )
  ],
  clasificacion_persona_naturalController.getclasificacion_persona_natural
);

// Ruta para obtener lista de clasificaion de persona natural sin paginacion
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_CLASIFICACION_PERSONA_NATURAL]
    )
  ],
  clasificacion_persona_naturalController.getListclasificacion_persona_natural
);

// Ruta para crear un nuev tipo de minuta
router.post('/',
  createclasificacion_persona_naturalValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_CLASIFICACION_PERSONA_NATURAL])
  ],
  clasificacion_persona_naturalController.storeclasificacion_persona_natural
);


// Ruta para obtener un tipo de minuta por ID
router.put('/:id',
  updateclasificacion_persona_naturalValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_CLASIFICACION_PERSONA_NATURAL])
  ],
  clasificacion_persona_naturalController.updateclasificacion_persona_natural
);

// Ruta para cambiar el estado de un cargo por ID
router.patch('/:id/estado',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_CLASIFICACION_PERSONA_NATURAL])
  ],
  [...idclasificacion_persona_naturalValidator, ...cambiarEstadoValidator],
  validateRequest,
  clasificacion_persona_naturalController.changeclasificacion_persona_naturalStatus
);

// RUTA GENÉRICA /:id
router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_CLASIFICACION_PERSONA_NATURAL])
  ],
  idclasificacion_persona_naturalValidator,
  validateRequest,
  clasificacion_persona_naturalController.showclasificacion_persona_natural
);

export default router;