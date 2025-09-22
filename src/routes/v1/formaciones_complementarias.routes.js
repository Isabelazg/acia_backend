import express from 'express';
import * as formacionescomplementariasController from '../../controllers/v1/formaciones_complementarias/formaciones_complementarias.controller.js';
import { createformacionescomplementariasValidator, updateformacionescomplementariasValidator, idformacionescomplementariasValidator} from '../../middlewares/validators/formaciones_complementarias.validator.js';
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
      [PermisoEnum.GESTIONAR_FORMACIONES]
    )
  ],
  formacionescomplementariasController.getformaciones_complementarias
);

// Ruta para obtener lista de tipos de minuta sin paginacion
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_FORMACIONES]
    )
  ],
  formacionescomplementariasController.getListformaciones_complementarias
);

// Ruta para crear un nuev tipo de minuta
router.post('/',
  createformacionescomplementariasValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_FORMACIONES])
  ],
  formacionescomplementariasController.storeformaciones_complementarias
);


// Ruta para obtener un tipo de minuta por ID
router.put('/:id',
  updateformacionescomplementariasValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_FORMACIONES])
  ],
  formacionescomplementariasController.updateformaciones_complementarias
);


// RUTA GENÉRICA /:id
router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_FORMACIONES])
  ],
  idformacionescomplementariasValidator,
  validateRequest,
  formacionescomplementariasController.showformaciones_complementarias
);

export default router;