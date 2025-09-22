export const fuenteRecursosSchemas = {
  FuenteRecurso: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      nombre: { type: 'string', example: 'Recursos Propios' },
      descripcion: { type: 'string', example: 'Fondos propios' }
    }
  },
  FuenteRecursoCreate: {
    type: 'object',
    required: ['nombre'],
    properties: {
      nombre: { type: 'string', example: 'Recursos Propios' },
      descripcion: { type: 'string', example: 'Fondos propios' }
    }
  },
  FuenteRecursoUpdate: {
    type: 'object',
    properties: {
      nombre: { type: 'string', example: 'Recursos Actualizados' },
      descripcion: { type: 'string', example: 'Fondos actualizados' }
    }
  },
  FuenteRecursoList: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      nombre: { type: 'string', example: 'Recursos Propios' }
    }
  }
};