import { body, param } from 'express-validator';
import CDP from '../../models/cdp.model.js';
import Centro from '../../models/centro.model.js';
import FuenteRecurso from '../../models/fuenteRecurso.model.js';
import CoordinadorGrupoMixto from '../../models/coordinadoresGrupoMixto.model.js';

const codigoParamValidator = [
  param('codigo')
    .isString()
    .withMessage('El número debe ser una cadena de texto.')
    .isLength({ min: 1, max: 50 })
    .withMessage('El número debe tener entre 1 y 50 caracteres.')
    .notEmpty()
    .withMessage('El número es obligatorio.')
];

const createCdpValidator = [
  body('codigo')
    .isString().withMessage('El número debe ser una cadena de texto.')
    .isLength({ max: 50 }).withMessage('El número no puede tener más de 50 caracteres.')
    .notEmpty().withMessage('El número es obligatorio.')
    .custom(async (codigo) => {
      const existing = await CDP.findOne({ where: { codigo } });
      if (existing) throw new Error('El código ya está en uso.');
    }),
  body('descripcion')
    .isString().isLength({ max: 255 }).notEmpty().withMessage('La descripción es obligatoria.'),
  body('fecha')
    .isDate().notEmpty().withMessage('La fecha es obligatoria.'),
  body('valor')
    .isDecimal().notEmpty().withMessage('El valor es obligatorio.'),
  body('vigencia')
    .isString().isLength({ max: 5 }).notEmpty().withMessage('La vigencia es obligatoria.'),
  body('quien_expide_id')
    .isInt().notEmpty().withMessage('El ID de quien expide es obligatorio.')
    .custom(async (id) => {
      const exists = await CoordinadorGrupoMixto.findByPk(id);
      if (!exists) throw new Error('El coordinador grupo mixto no existe.');
    }),
  body('fuente_recurso_id')
    .isInt().notEmpty().withMessage('El ID de fuente de recurso es obligatorio.')
    .custom(async (id) => {
      const exists = await FuenteRecurso.findByPk(id);
      if (!exists) throw new Error('La fuente de recurso no existe.');
    }),
  body('centro_id')
    .isInt().notEmpty().withMessage('El centro es obligatorio.')
    .custom(async (id) => {
      const exists = await Centro.findByPk(id);
      if (!exists) throw new Error('El centro no existe.');
    })
];

const updateCdpValidator = [
  body('descripcion').optional().isString().isLength({ max: 255 }),
  body('fecha').optional().isDate(),
  body('valor').optional().isDecimal(),
  body('vigencia').optional().isString().isLength({ max: 5 }),
  body('quien_expide_id').optional().isInt()
    .custom(async (id) => {
      if (id === undefined) return true;
      const exists = await CoordinadorGrupoMixto.findByPk(id);
      if (!exists) throw new Error('El coordinador grupo mixto no existe.');
    }),
  body('fuente_recurso_id').optional().isInt()
    .custom(async (id) => {
      if (id === undefined) return true;
      const exists = await FuenteRecurso.findByPk(id);
      if (!exists) throw new Error('La fuente de recurso no existe.');
    }),
  body('centro_id').optional().isInt()
    .custom(async (id) => {
      if (id === undefined) return true;
      const exists = await Centro.findByPk(id);
      if (!exists) throw new Error('El centro no existe.');
    })
];

export {
  createCdpValidator,
  updateCdpValidator,
  codigoParamValidator
};
