import express from 'express';
import * as AutorizacionController from '../../controllers/v1/autorizacion/autorizacion.controller.js';
import * as AutorizacionExtractionController from '../../controllers/v1/autorizacion/extractionController.js';
import { createAutorizacionValidator, updateAutorizacionValidator, numeroParamValidator } from '../../middlewares/validators/autorizaciones.validator.js';
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from '../../middlewares/auth.middleware.js';
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { uploadPDF, handleMulterError } from "../../middlewares/pdfUpload.middleware.js";
import { RolEnum } from '../../enums/rol.enum.js';
import { PermisoEnum } from '../../enums/permiso.enum.js';

const router = express.Router();

// Ruta para obtener todas las autorizaciones
router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.GESTIONAR_AUTORIZACIONES]
    )
  ],
  AutorizacionController.getAutorizaciones
);

// Ruta para obtener lista de autorizaciones
router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.GESTIONAR_AUTORIZACIONES]
    )
  ],
  AutorizacionController.getListAutorizaciones
);

// Ruta para crear una nueva autorización
router.post('/',
  createAutorizacionValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_AUTORIZACIONES])
  ],
  AutorizacionController.storeAutorizacion
);

// Ruta para obtener una autorización por número
router.get('/:numero',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO], [PermisoEnum.GESTIONAR_AUTORIZACIONES])
  ],
  numeroParamValidator,
  validateRequest,
  AutorizacionController.showAutorizacion
);

// Ruta para editar una autorización por número
router.put('/:numero',
  updateAutorizacionValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_AUTORIZACIONES])
  ],
  AutorizacionController.updateAutorizacion
);

// Ruta para eliminar una autorización por número
router.delete('/:numero',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_AUTORIZACIONES])
  ],
  numeroParamValidator,
  validateRequest,
  AutorizacionController.deleteAutorizacion
);

// Rutas para extracción de PDF
router.post('/extract-pdf',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.GESTIONAR_AUTORIZACIONES]),
    uploadPDF,
  ],
  handleMulterError,
  AutorizacionExtractionController.extractAutorizacionFromPDF
);
export default router;
