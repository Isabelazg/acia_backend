import express from 'express';
import * as titulo_formacionController from '../../controllers/v1/tipo_formacion/tipo_formacion.controller.js';
import { createtitulo_formacionValidator, updatetitulo_formacionValidator, idtitulo_formacionValidator, cambiarEstadoValidator } from '../../middlewares/validators/tipo_formacion.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todos los titulos de formacion
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_TITULO_FORMACION]
    )
  ],
  titulo_formacionController.gettitulo_formacion
);

// Ruta para obtener lista de titulos de formacion sin paginacion
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR],
      [PermisoEnum.GESTIONAR_TITULO_FORMACION]
    )
  ],
  titulo_formacionController.getListtitulo_formacion
);

// Ruta para crear un nuevo titulo de formacion
router.post('/',
  createtitulo_formacionValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_TITULO_FORMACION])
  ],
  titulo_formacionController.storetitulo_formacion
);


// Ruta para obtener un titulo de formacion por ID
router.put('/:id',
  updatetitulo_formacionValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_TITULO_FORMACION])
  ],
  titulo_formacionController.updatetitulo_formacion
);

// Ruta para cambiar el estado de un titulo de formacion por ID
router.patch('/:id/estado',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_TITULO_FORMACION])
  ],
  [...idtitulo_formacionValidator, ...cambiarEstadoValidator],
  validateRequest,
  titulo_formacionController.changetitulo_formacionStatus
);

// RUTA GENÉRICA /:id
router.get('/:id',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_TITULO_FORMACION])
  ],
  idtitulo_formacionValidator,
  validateRequest,
  titulo_formacionController.showtitulo_formacion
);

export default router;