import express from 'express';
import * as CentroController from '../../controllers/v1/centros/centro.controller.js';
import { getListCoordinadoresByCentro } from '../../controllers/v1/centros/centroCoordinador.controller.js';
import * as CdpController from '../../controllers/v1/cdp/Cdp.controller.js';
import { createCentroValidator, updateCentroValidator, codigoParamValidator, cambiarEstadoValidator } from '../../middlewares/validators/centros.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todos los centros
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.GESTIONAR_CENTROS]
    ),
  ],
  CentroController.getCentros
);

router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.GESTIONAR_CENTROS]
    ),
  ],
  CentroController.getListCentros
);

// Ruta para crear un nuevo centro
router.post('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_CENTROS])
  ],
  createCentroValidator,
  CentroController.storeCentro
);

// Ruta para editar un centro por código
router.put('/:codigo',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_CENTROS])
  ],
  [...codigoParamValidator, ...updateCentroValidator],
  CentroController.updateCentro
);
// Ruta para obtener coordinadores filtrados por centro
router.get('/:codigo/coordinadores',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.GESTIONAR_CENTROS]
    ),
  ],
  getListCoordinadoresByCentro
);
// Ruta para cambiar el estado de un centro por código
router.patch('/:codigo/estado',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_CENTROS])
  ],
  [...codigoParamValidator, ...cambiarEstadoValidator],
  CentroController.changeCentroStatus
);

// Ruta para obtener un centro por código
router.get('/:codigo',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_CENTROS])
  ],
  codigoParamValidator,
  CentroController.showCentro
);

// Endpoint para consultar los CDP de un centro por su ID
router.get(
  '/:centro_id/cdps',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.GESTIONAR_CDPS]
    )
  ],
  async (req, res) => {
    req.query.centro_id = req.params.centro_id;
    return CdpController.getCdps(req, res);
  }
);

export default router;

// Ruta para obtener las áreas asociadas a un centro por su ID
router.get('/:id/areas',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.GESTIONAR_CENTROS]
    ),
  ],
  CentroController.getAreasByCentro
);


