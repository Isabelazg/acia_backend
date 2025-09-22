import express from 'express';
import * as ciudadController from '../../controllers/v1/ciudad/ciudad.controller.js';
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
            RolEnum.SUPERADMINISTRADOR
        ], [PermisoEnum.GESTIONAR_CIUDADES])
    ],
    ciudadController.getCities
);

router.get('/:id',
    [
        verificarToken,
        verificarCuentaActiva,
        verificarRolOPermiso([
            RolEnum.SUPERADMINISTRADOR
        ], [PermisoEnum.GESTIONAR_CIUDADES])
    ],
    ciudadController.showCity
);

export default router;
