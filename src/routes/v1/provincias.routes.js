import express from 'express';
import * as ProvinciaController from '../../controllers/v1/provincia/provincia.controller.js';
import { getCitiesByProvince } from '../../controllers/v1/provincia/provinciaCiudad.controller.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

router.get(
    '/',
    [
        verificarToken,
        verificarCuentaActiva,
        verificarRolOPermiso([
            RolEnum.ADMINISTRADOR,
            RolEnum.EMPLEADO,
            RolEnum.USUARIO
        ], [PermisoEnum.GESTIONAR_PROVINCIAS])
    ],
    ProvinciaController.getProvinces
);


router.get('/:id',
    [
        verificarToken,
        verificarCuentaActiva,
        verificarRolOPermiso([
            RolEnum.ADMINISTRADOR,
            RolEnum.EMPLEADO,
            RolEnum.USUARIO
        ], [PermisoEnum.GESTIONAR_PROVINCIAS])
    ],
    ProvinciaController.showProvince
);

// Ruta para obtener las ciudades de una provincia por ID
router.get('/:id/ciudades',
    [
        verificarToken,
        verificarCuentaActiva,
        verificarRolOPermiso([RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO], [PermisoEnum.GESTIONAR_CIUDADES])
    ],
    getCitiesByProvince
);

export default router;
