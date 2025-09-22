import express from 'express';
import * as necesidad_contratacionController from '../../controllers/v1/necesidad_contratacion/necesidad_contratacion.controller.js';
import { updatenecesidad_contratacionValidator, creatnecesidad_contratacionValidator, idnecesidad_contratacionValidator, cambiarEstadoValidator } from '../../middlewares/validators/necesidad_contratacion.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todos los tipos de minuta
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_NECESIDAD_CONTRATACION]
    )
  ],
  necesidad_contratacionController.getnecesidad_contratacion
);

// Ruta para obtener lista de tipos de minuta sin paginacion
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_NECESIDAD_CONTRATACION]
    )
  ],
  necesidad_contratacionController.getListnecesidad_contratacion
);

// Ruta para crear un nuev tipo de minuta
router.post('/',
  creatnecesidad_contratacionValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_NECESIDAD_CONTRATACION])
  ],
  necesidad_contratacionController.storenecesidad_contratacion
);


// Ruta para obtener un tipo de minuta por ID
router.put('/:id',
  updatenecesidad_contratacionValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_NECESIDAD_CONTRATACION])
  ],
  necesidad_contratacionController.updatenecesidad_contratacion
);

// Ruta para cambiar el estado de un cargo por ID
router.patch('/:id/estado',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_NECESIDAD_CONTRATACION])
  ],
  [...idnecesidad_contratacionValidator, ...cambiarEstadoValidator],
  validateRequest,
  necesidad_contratacionController.changenecesidad_contratacionStatus
);

// RUTA GENÉRICA /:id
router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_NECESIDAD_CONTRATACION])
  ],
  idnecesidad_contratacionValidator,
  validateRequest,
  necesidad_contratacionController.shownecesidad_contratacion
);

export default router;