import express from 'express';
import * as tipo_documentoController from '../../controllers/v1/tipo_documento/tipo_documento.controller.js';
import { updatetipo_documentoValidator, creattipo_documentoValidator, idtipo_documentoValidator, cambiarEstadoValidator } from '../../middlewares/validators/tipo_documento.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todos los tipos de documento
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_TIPO_DOCUMENTO]
    )
  ],
  tipo_documentoController.gettipo_documento
);

// Ruta para obtener lista de tipos de documento sin paginacion
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_TIPO_DOCUMENTO]
    )
  ],
  tipo_documentoController.getListtipo_documento
);

// Ruta para crear un nuev tipo de documento
router.post('/',
  creattipo_documentoValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_TIPO_DOCUMENTO])
  ],
  tipo_documentoController.storetipo_documento
);


// Ruta para obtener un tipo de documento por ID
router.put('/:id',
  updatetipo_documentoValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_TIPO_DOCUMENTO])
  ],
  tipo_documentoController.updatetipo_documento
);

// Ruta para cambiar el estado de un tipo de documento por ID
router.patch('/:id/estado',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_TIPO_DOCUMENTO])
  ],
  [...idtipo_documentoValidator, ...cambiarEstadoValidator],
  validateRequest,
  tipo_documentoController.changetipo_documentoStatus
);

// RUTA GENÉRICA /:id
router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_TIPO_DOCUMENTO])
  ],
  idtipo_documentoValidator,
  validateRequest,
  tipo_documentoController.showtipo_documento
);

export default router;