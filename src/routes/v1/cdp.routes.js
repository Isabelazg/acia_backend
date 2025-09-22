import { Router } from "express";
import * as CdpController from "../../controllers/v1/cdp/Cdp.controller.js";
import * as CdpExtractionController from "../../controllers/v1/cdp/extractionController.js";
import { createCdpValidator, updateCdpValidator, codigoParamValidator } from "../../middlewares/validators/cdp.validator.js";
import { verificarToken, verificarCuentaActiva, verificarRolOPermiso } from "../../middlewares/auth.middleware.js";
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { uploadPDF, handleMulterError } from "../../middlewares/pdfUpload.middleware.js";
import { RolEnum } from "../../enums/rol.enum.js";
import { PermisoEnum } from "../../enums/permiso.enum.js";

const router = Router();

router.get('/',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.VER_CDPS]
    ),
  ],
  CdpController.getCdps
);

router.get('/list',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.VER_CDPS]
    ),
  ],
  CdpController.getListCdps
);

router.post('/',
  createCdpValidator, validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.CREAR_CDPS])
  ],
  CdpController.storeCdp
);

router.post('/dependencias-por-rubros',
  // TEMPORAL: Sin autenticación para pruebas
  // [
  //   verificarToken,
  //   verificarCuentaActiva,
  //   verificarRolOPermiso(
  //     [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
  //     [PermisoEnum.VER_CDPS]
  //   ),
  // ],
  CdpController.getDependenciasByRubros
);

router.put('/:codigo',
  updateCdpValidator,
  validateRequest,
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.EDITAR_CDPS])
  ],
  CdpController.updateCdp
);

router.get('/:codigo',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.VER_CDPS])
  ],
  codigoParamValidator,
  CdpController.showCdp
);

// Ruta para validar códigos de CDP
router.post('/validate-codigo',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.CREAR_CDPS, PermisoEnum.EDITAR_CDPS])
  ],
  CdpController.validateCodigo
);

// Nuevas rutas para extracción de PDF
router.post('/extract-pdf',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO],
      [PermisoEnum.CREAR_CDPS]
    ),
    uploadPDF,
  ],
  handleMulterError,
  CdpExtractionController.extractCDPFromPDF
);

router.post('/extract-text',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO],
      [PermisoEnum.VER_CDPS]
    ),
    uploadPDF,
  ],
  handleMulterError,
  CdpExtractionController.extractTextFromPDF
);

router.post('/process-and-save',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso([RolEnum.ADMINISTRADOR], [PermisoEnum.CREAR_CDPS]),
    uploadPDF,
  ],
  handleMulterError,
  CdpExtractionController.processCDPAndSave
);

// Ruta para obtener dependencias por CDP ID
router.get('/:id/dependencias',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.GESTIONAR_AUTORIZACIONES]
    )
  ],
  CdpController.getDependenciasByCdp
);

// Ruta para obtener dependencias por CDP ID
router.get('/:id/dependencias',
  [
    verificarToken,
    verificarCuentaActiva,
    verificarRolOPermiso(
      [RolEnum.ADMINISTRADOR, RolEnum.EMPLEADO, RolEnum.USUARIO],
      [PermisoEnum.GESTIONAR_AUTORIZACIONES]
    )
  ],
  CdpController.getDependenciasByCdp
);

export default router;