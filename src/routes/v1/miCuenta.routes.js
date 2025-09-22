import express from 'express';
import * as  cuentaController from '../../controllers/v1/cuenta/cuenta.controller.js';
import { verificarToken, verificarCuentaActiva } from '../../middlewares/auth.middleware.js';
import { updateAccountValidator } from '../../middlewares/validators/cuenta.validator.js';
import { validateRequest } from '../../middlewares/validateRequest.middleware.js';

const router = express.Router();

router.get(
    '/',
    [
        verificarToken,
        verificarCuentaActiva,
    ],
    cuentaController.getMyAccount
);

router.get(
    '/permisos',
    [
        verificarToken,
        verificarCuentaActiva,
    ],
    cuentaController.getMyyPermissions
);

router.put(
    '/',
    [
        verificarToken,
        verificarCuentaActiva,
        ...updateAccountValidator,
        validateRequest,
    ],
    cuentaController.updateMyAccount
);


export default router;
