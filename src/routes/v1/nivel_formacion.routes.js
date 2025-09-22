import express from 'express';
import * as nivel_formacionController from '../../controllers/v1/nivel_formacion/nivel_formacion.controller.js';
import { createnivel_formacionValidator, updatenivel_formacionValidator, idnivel_formacionValidator, cambiarEstadoValidator } from '../../middlewares/validators/nivel_formacion.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todos los niveles de formación
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_NIVEL_FORMACION]
    )
  ],
  nivel_formacionController.getnivel_formacion
);

// Ruta para obtener lista de niveles de formación sin paginacion
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_NIVEL_FORMACION]
    )
  ],
  nivel_formacionController.getListnivel_formacion
);

// Ruta para crear un nuevo nivel de formación
router.post('/',
  createnivel_formacionValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_NIVEL_FORMACION])
  ],
  nivel_formacionController.storenivel_formacion
);


// Ruta para obtener un nivel de formación por ID
router.put('/:id',
  updatenivel_formacionValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_NIVEL_FORMACION])
  ],
  nivel_formacionController.updatenivel_formacion
);

// Ruta para cambiar el estado de un nivel de formacion por ID
router.patch('/:id/estado',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_NIVEL_FORMACION])
  ],
  [...idnivel_formacionValidator, ...cambiarEstadoValidator],
  validateRequest,
  nivel_formacionController.changenivel_formacionStatus
);

// RUTA GENÉRICA /:id
router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_NIVEL_FORMACION])
  ],
  idnivel_formacionValidator,
  validateRequest,
  nivel_formacionController.shownivel_formacion
);

export default router;